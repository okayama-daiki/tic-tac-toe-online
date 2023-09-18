# -*- coding: utf-8 -*-

import asyncio
import typing as t

from backend.backend.client import Client
from backend.backend.common.types import ClientIdType, ClientStatus, RoomNoType
from backend.backend.room import Room

clients: dict[ClientIdType, Client] = {}
rooms: dict[RoomNoType, Room] = {}


def to_bytearray(string: str) -> bytearray:
    return bytearray(string, "UTF-8")


async def handle_client(reader: asyncio.StreamReader,
                        writer: asyncio.StreamWriter):

    client: t.Final = Client(reader=reader, writer=writer)
    clients[client.id] = client

    while True:

        data = await reader.readline()
        message = data.decode().strip()

        # disconnect
        if any(message.startswith(sign) for sign in ('quit', 'exit', 'close')):
            writer.write(to_bytearray('bye\n'))
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            del clients[client.id]
            break

        # create a new room
        if message.startswith("create"):

            if client.status != ClientStatus.SEARCHING:
                writer.write(to_bytearray('already created room\n'))
                await writer.drain()
                continue

            room_no: RoomNoType = message.lstrip("create").strip()

            if room_no == "":
                writer.write(to_bytearray(f'invalid room number, {room_no}\n'))
                await writer.drain()
                continue

            if room_no in rooms:
                writer.write(
                    to_bytearray(f'room {room_no} is already exist\n'))
                await writer.drain()
                continue

            rooms[room_no] = Room(initial_client_ids=[client.id],
                                  room_no=room_no)
            client.room_no = room_no
            writer.write(to_bytearray(f'success to create room {room_no}\n'))

            continue

        # join a existing room
        if message.startswith("join"):

            if client.status != ClientStatus.SEARCHING:
                writer.write(to_bytearray('already joined room\n'))
                await writer.drain()
                continue

            room_no: RoomNoType = message.lstrip("join").strip()

            if room_no == "":
                writer.write(to_bytearray(f'invalid room number, {room_no}\n'))
                await writer.drain()
                continue

            if room_no not in rooms:
                writer.write(to_bytearray(f'room {room_no} is not exist\n'))
                await writer.drain()
                continue

            room = rooms[room_no]

            if room.add_client(client.id):
                client.room_no = room_no
                writer.write(to_bytearray(f'success to join room {room_no}\n'))
            else:
                writer.write(to_bytearray(f'room {room_no} is almost full\n'))
                await writer.drain()
                continue

            for client_id in rooms[room_no].client_ids:
                clients[client_id].status = ClientStatus.PLAYING

        # playing game
        if message.startswith("put"):

            # `room_no is None` is not needed, but for mypy error: rooms[client.room_no]
            if client.status != ClientStatus.PLAYING or client.room_no is None:
                client.writer.write(to_bytearray('you are not in any room\n'))
                await client.writer.drain()
                continue

            room = rooms[client.room_no]
            game = room.game

            # first move
            # Note: the client who send "put" message first is always cross
            if game.elapsed_turn == 0:
                room.cross = client.id

            if game.elapsed_turn % 2 == 0:
                if client.id != room.cross:
                    client.writer.write(to_bytearray('it is not your turn\n'))
                    await client.writer.drain()
                    continue
            else:
                if client.id == room.cross:
                    client.writer.write(to_bytearray('it is not your turn\n'))
                    await client.writer.drain()
                    continue

            # expected valid message: "put y x", entrust client to send valid message
            y, x = map(int, message.lstrip("put").strip().split())

            game.put((y, x))

            for client_id in room.client_ids:
                clients[client_id].writer.write(to_bytearray(f'{game}\n'))
                await clients[client_id].writer.drain()

            if game.is_ended():
                for client_id in room.client_ids:
                    clients[client_id].status = ClientStatus.SEARCHING
                    clients[client_id].room_no = None
                    clients[client_id].writer.write(
                        to_bytearray('game finished\n'))
                    await clients[client_id].writer.drain()

        # writer.write(data)
        # await writer.drain()


async def main():
    server = await asyncio.start_server(handle_client, "localhost", 8888)
    async with server:
        await server.serve_forever()
