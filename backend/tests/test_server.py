# -*- coding: utf-8 -*-
# Note: before tests, run `python -m backend`

import pytest
import websockets.client


@pytest.mark.asyncio
async def test_connect():
    async with websockets.client.connect('ws://localhost:8888'):
        ...


@pytest.mark.asyncio
async def test_create_room():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create 0001')
        data = await client.recv()
        assert data == 'success to create room 0001'


@pytest.mark.asyncio
async def test_create_room_already_created():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create 0002')
        data = await client.recv()
        assert data == 'success to create room 0002'
        await client.send('create 0003')
        data = await client.recv()
        assert data == 'already created room'


@pytest.mark.asyncio
async def test_create_room_with_invalid_room_no():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create')
        data = await client.recv()
        assert data == 'invalid room number'


@pytest.mark.asyncio
async def test_create_room_already_existed():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create 0004')
        async with websockets.client.connect('ws://localhost:8888') as client2:
            await client2.send('create 0004')
            data = await client2.recv()
            assert data == 'room 0004 is already exist'


@pytest.mark.asyncio
async def test_join_room():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create 0005')
        async with websockets.client.connect('ws://localhost:8888') as client2:
            await client2.send('join 0005')
            data = await client2.recv()
            assert data == 'success to join room 0005'
            data = await client2.recv()
            assert data == 'game started'


@pytest.mark.asyncio
async def test_join_room_already_joined():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('create 0006')
        async with websockets.client.connect('ws://localhost:8888') as client2:
            await client2.send('join 0006')
            data = await client2.recv()
            assert data == 'success to join room 0006'
            data = await client2.recv()
            assert data == 'game started'
            await client2.send('join 0007')
            data = await client2.recv()
            assert data == 'already joined room'


@pytest.mark.asyncio
async def test_join_room_with_invalid_room_no():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('join')
        data = await client.recv()
        assert data == 'invalid room number'


@pytest.mark.asyncio
async def test_join_room_with_not_exist():
    async with websockets.client.connect('ws://localhost:8888') as client:
        await client.send('join 0008')
        data = await client.recv()
        assert data == 'room 0008 is not exist'


# TODO: add test for put
