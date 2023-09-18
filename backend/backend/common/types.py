# -*- coding: utf-8 -*-

import enum
import typing as t
import uuid


class CellState(enum.Enum):
    BLANK = '□'
    CROSS = 'x'
    NOUGHT = 'o'


class ClientStatus(enum.Enum):
    SEARCHING = 0
    WAITING = 1
    PLAYING = 2


GameBoardType: t.TypeAlias = list[list[CellState]]
PositionType: t.TypeAlias = tuple[int, int]
ClientIdType: t.TypeAlias = uuid.UUID
RoomNoType: t.TypeAlias = str
