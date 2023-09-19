# -*- coding: utf-8 -*-

import typing as t
import uuid

import websockets.server
from websockets.typing import Data

from backend.backend.common.types import ClientIdType, ClientStatus, RoomNoType


class Client:

    def __init__(self, socket: websockets.server.WebSocketServerProtocol):
        self.status: ClientStatus = ClientStatus.SEARCHING
        self.socket: t.Final = socket
        self.id: t.Final[ClientIdType] = uuid.uuid4()
        self.room_no: t.Optional[RoomNoType] = None

    async def send(self, data: Data) -> None:
        '''
        send data to client
        '''
        await self.socket.send(data)
