# -*- coding: utf-8 -*-

import asyncio
import typing as t

import websockets
import websockets.server

from backend.backend.client import Client
from backend.backend.common.types import ClientIdType, ClientStatus, RoomNoType
from backend.backend.room import Room

clients: dict[ClientIdType, Client] = {}
rooms: dict[RoomNoType, Room] = {}


async def handle_client(websocket: websockets.server.WebSocketServerProtocol):

    # connect
    client: t.Final = Client(socket=websocket)
    clients[client.id] = client

    async for message in websocket:

        message = str(message)
        print(f'{client.id}> {message}')

        # disconnect
        if any(message.startswith(sign) for sign in ('quit', 'exit', 'close')):
            await client.send('bye')
            await websocket.close()
            break

        # create a new room
        if message.startswith("create"):

            if client.status != ClientStatus.SEARCHING:
                await client.send('already created room')
                continue

            room_no: RoomNoType = message.lstrip("create").strip()

            if room_no == "":
                await client.send(f'invalid room number, {room_no}')
                continue

            if room_no in rooms:
                await client.send(f'room {room_no} is already exist\n')
                continue

            rooms[room_no] = Room(initial_client_ids=[client.id],
                                  room_no=room_no)
            client.room_no = room_no
            client.status = ClientStatus.WAITING
            await client.send(f'success to create room {room_no}')

            continue

        # join a existing room
        if message.startswith("join"):

            if client.status != ClientStatus.SEARCHING:
                await client.send('already joined room')
                continue

            room_no: RoomNoType = message.lstrip("join").strip()

            if room_no == "":
                await client.send(f'invalid room number, {room_no}')
                continue

            if room_no not in rooms:
                await client.send(f'room {room_no} is not exist')
                continue

            room = rooms[room_no]

            if room.add_client(client.id):
                client.room_no = room_no
                await client.send(f'success to join room {room_no}')
            else:
                await client.send(f'room {room_no} is almost full')
                continue

            for client_id in rooms[room_no].client_ids:
                await clients[client_id].send('game started')
                clients[client_id].status = ClientStatus.PLAYING

        # playing game
        if message.startswith("put"):

            # `room_no is None` is not needed, but for mypy error: rooms[client.room_no]
            if client.status != ClientStatus.PLAYING or client.room_no is None:
                await client.send(('you are not in any room'))
                continue

            room = rooms[client.room_no]
            game = room.game

            # first move
            # Note: the client who send "put" message first is always cross
            if game.elapsed_turn == 0:
                room.cross = client.id

            if game.elapsed_turn % 2 == 0:
                if client.id != room.cross:
                    await client.send('it is not your turn')
                    continue
            else:
                if client.id == room.cross:
                    await client.send('it is not your turn')
                    continue

            # expected valid message: "put y x", entrust client to send valid message
            y, x = map(int, message.lstrip("put").strip().split())

            game.put((y, x))

            for client_id in room.client_ids:
                await clients[client_id].send(f'put {y} {x}')
                await clients[client_id].send(f'board {game}')

            if game.is_ended():
                for client_id in room.client_ids:
                    clients[client_id].status = ClientStatus.SEARCHING
                    clients[client_id].room_no = None
                    await clients[client_id].send('game finished')


# TODO: HOST and PORT should be set by environment variable
async def main():
    async with websockets.server.serve(handle_client, "localhost", 8888):
        await asyncio.Future()
