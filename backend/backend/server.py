# -*- coding: utf-8 -*-

import asyncio
import logging
import re
import typing as t
import unicodedata

import websockets
import websockets.server

from backend.backend.client import Client
from backend.backend.common.types import ClientIdType, ClientStatus, RoomNoType
from backend.backend.room import Room

logger = logging.getLogger(__name__)
handler = logging.FileHandler("./backend/logs/server.log")
handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s: %(message)s"))

if __debug__:
    logger.setLevel(logging.DEBUG)
    handler.setLevel(logging.DEBUG)
else:
    logger.setLevel(logging.INFO)
    handler.setLevel(logging.INFO)
logger.addHandler(handler)

valid_digit_pattern = re.compile(r"^\d{1,6}$")

clients: dict[ClientIdType, Client] = {}
rooms: dict[RoomNoType, Room] = {}


async def handle_client(websocket: websockets.server.WebSocketServerProtocol):

    # connected
    client: t.Final = Client(socket=websocket)
    clients[client.id] = client

    async for message in websocket:

        message = str(message)
        logger.info(f"{client.id}> {message}")

        match client.status:

            case ClientStatus.SEARCHING:

                query, raw_room_no = message.split()  # expected `(create|join) \d{1,6}`
                room_no = unicodedata.normalize("NFKC", raw_room_no.strip())

                if re.match(valid_digit_pattern, room_no) is None:
                    await client.send("The room number must be 1~6 digits.")
                    continue

                match query:

                    # create a new room
                    case "create":
                        if room_no in rooms:
                            await client.send(f"The room {room_no} is already exist.")
                            continue

                        room = Room(initial_client_ids=[client.id], room_no=room_no)
                        room.cross = client.id
                        rooms[room_no] = room

                        client.room_no = room_no
                        client.status = ClientStatus.WAITING
                        await client.send(f"success to create room {room_no}")

                    # join a existing room
                    case "join":
                        if room_no not in rooms:
                            await client.send(f"The room {room_no} is not exist.")
                            continue

                        room = rooms[room_no]

                        if room.add_client(client.id):
                            client.room_no = room_no
                            await client.send(f"success to join room {room_no}")
                        else:
                            await client.send(f"room {room_no} is almost full")
                            continue

                        for client_id in room.client_ids:
                            if client_id == room.cross:
                                await clients[client_id].send("game started x")
                            else:
                                await clients[client_id].send("game started o")
                            await clients[client_id].send(
                                f"board {room.game} {room.game.elapsed_turn}"
                            )
                            clients[client_id].status = ClientStatus.PLAYING

                    # invalid query
                    case _:
                        pass

            case ClientStatus.WAITING:

                query = message  # expected `(leave)`

                # leave the room
                # Note: This logic is intended for use by the client who created the room.
                # This is because the client who join the existing room will start the game soon.
                if query == "leave":

                    # if-statement below is not needed, but for mypy error: rooms[client.room_no]
                    if client.room_no is None:
                        continue

                    del rooms[client.room_no]
                    client.status = ClientStatus.SEARCHING
                    client.room_no = None

            case ClientStatus.PLAYING:

                query, *yx = message.split()  # expected `(put|restart|finish) (\d \d)?`

                # following if-statement is not needed, but for mypy error: rooms[client.room_no]
                if client.room_no is None:
                    continue

                room = rooms[client.room_no]
                game = room.game

                match query:

                    # put a piece
                    case "put":
                        if game.elapsed_turn % 2 == 0:
                            if client.id != room.cross:
                                await client.send("it is not your turn")
                                continue
                        else:
                            if client.id == room.cross:
                                await client.send("it is not your turn")
                                continue

                        y, x = map(int, yx)

                        game.put((y, x))

                        for client_id in room.client_ids:
                            await clients[client_id].send(f"put {y} {x}")
                            await clients[client_id].send(
                                f"board {game} {game.elapsed_turn}"
                            )

                        if game.is_ended():
                            for client_id in room.client_ids:
                                await clients[client_id].send(
                                    f"game ended: {game.get_result()}"
                                )

                    # restart game
                    case "restart":
                        game.reset()

                        for client_id in room.client_ids:
                            await clients[client_id].send(
                                f"board {game} {game.elapsed_turn}"
                            )

                    # finish game
                    case "finish":
                        del rooms[client.room_no]

                        for client_id in room.client_ids:
                            clients[client_id].status = ClientStatus.SEARCHING
                            clients[client_id].room_no = None
                            await clients[client_id].send("game finished")

                        del room

                    # invalid query
                    case _:
                        pass


# TODO: HOST and PORT should be set by environment variable
async def main():

    async with websockets.server.serve(handle_client, "0.0.0.0", 5174) as server:

        for socket in server.sockets:
            host, port = socket.getsockname()
            logger.info(f"Serving on ws://{host}:{port}")

        await asyncio.Future()
