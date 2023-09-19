# -*- coding: utf-8 -*-

import backend.backend.game as Game


def test_put_handmade_1():
    '''
    finally board is:
    oxo
    xoo
    oxx
    '''
    game = Game.TicTacToe()
    game.put((0, 0))
    game.put((0, 1))
    game.put((1, 1))
    game.put((2, 2))
    game.put((2, 2))
    game.put((1, 2))
    game.put((1, 0))
    game.put((0, 3))
    game.put((2, 0))


def test_put_handmade_2():
    '''
    finally board is:
    xo.
    xo.
    .o.
    '''
    game = Game.TicTacToe()
    game.put((1, 1))
    game.put((0, 0))
    game.put((0, 1))
    game.put((1, 0))
    game.put((2, 0))


def test_put_handmade_3():
    '''
    finally board is:
    ...
    .xo
    ...
    '''
    game = Game.TicTacToe()
    game.put((1, 2))
    game.put((1, 1))
