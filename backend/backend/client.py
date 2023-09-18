# -*- coding: utf-8 -*-

import asyncio
import typing as t
import uuid

from backend.backend.common.types import ClientIdType, ClientStatus, RoomNoType


class Client:

    def __init__(self, reader: asyncio.StreamReader,
                 writer: asyncio.StreamWriter):
        self.status: ClientStatus = ClientStatus.SEARCHING
        self.reader: t.Final = reader
        self.writer: t.Final = writer
        self.id: t.Final[ClientIdType] = uuid.uuid4()
        self.room_no: t.Optional[RoomNoType] = None
