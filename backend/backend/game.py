# -*- coding: utf-8 -*-

import operator

from backend.backend.common.types import CellState, GameBoardType, PositionType


class TicTacToe:
    '''
    class TicTacToe
    '''

    LINES = [
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)],
    ]

    HITS = {
        (CellState.NOUGHT, CellState.NOUGHT, CellState.NOUGHT),
        (CellState.CROSS, CellState.CROSS, CellState.CROSS),
    }

    def __init__(self) -> None:

        self.elapsed_turn: int
        self.board: GameBoardType

        self._initialize_elapsed_turn()
        self._initialize_board()

    def __repr__(self) -> str:
        '''
        Return a string representation of the game board.
        '''
        return ''.join(''.join(map(operator.attrgetter('value'), row))
                       for row in self.board)

    @property
    def current_turn(self) -> CellState:
        '''
        Return the current turn.
        '''
        return (CellState.CROSS, CellState.NOUGHT)[self.elapsed_turn % 2]

    def is_ended(self) -> bool:
        '''
        Return True if the game is ended.
        '''
        for target_line in self.LINES:

            line = tuple(self.board[y][x] for y, x in target_line)
            if line in self.HITS:
                return True

        return False

    def get_result(self) -> str:
        '''
        Return the result of the game.
        '''
        if not self.is_ended():
            return 'not ended'
        for target_line in self.LINES:
            line = tuple(self.board[y][x] for y, x in target_line)
            if line in self.HITS:
                return f'{line[0].value} win'
        return 'draw'

    def put(self, position: PositionType) -> bool:
        '''
        Return True if the position is valid and the cell is blank.
        '''

        if self.is_ended():
            return False

        y, x = position

        if not (0 <= y < 3 and 0 <= x < 3):
            return False

        if self.board[y][x] != CellState.BLANK:
            return False

        self.board[y][x] = self.current_turn

        self.elapsed_turn += 1

        return True

    def reset(self) -> bool:

        self._initialize_elapsed_turn()
        self._initialize_board()

        return True

    def _initialize_elapsed_turn(self) -> None:

        self.elapsed_turn = 0

    def _initialize_board(self) -> None:

        self.board = [
            [CellState.BLANK, CellState.BLANK, CellState.BLANK],
            [CellState.BLANK, CellState.BLANK, CellState.BLANK],
            [CellState.BLANK, CellState.BLANK, CellState.BLANK],
        ]
