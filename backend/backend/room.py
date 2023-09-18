# -*- coding: utf-8 -*-

import typing as t

from backend.backend.common.types import ClientIdType, RoomNoType
from backend.backend.game import TicTacToe


class Room:
    '''
    A room for playing game.
    '''

    def __init__(self, room_no: RoomNoType,
                 initial_client_ids: list[ClientIdType]):
        self.room_no: t.Final = room_no
        self.client_ids = initial_client_ids[:]
        self.game = TicTacToe()
        self.cross: t.Optional[ClientIdType] = None

    def add_client(self, client_id: ClientIdType) -> bool:
        '''
        Add a client to the room. If the room is full, return False.
        '''
        if len(self.client_ids) >= 2:
            return False

        self.client_ids.append(client_id)
        return True

    def remove_client(self, client_id: ClientIdType) -> bool:
        '''
        Remove a client from the room.
        If the client is not in the room, return False.
        '''
        if client_id not in self.client_ids:
            return False

        self.client_ids.remove(client_id)
        return True
