// @ts-nocheck
const { createEvent, createStore, forward } = require('effector');
const { argumentHistory } = require('../test-library');
const { spread } = require('./index');

describe('spread(source, targets)', () => {
  test('event to events', () => {
    const source = createEvent();
    const targetA = createEvent();
    const targetB = createEvent();

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    spread(source, {
      first: targetA,
      second: targetB,
    });

    source({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('event to stores', () => {
    const source = createEvent();
    const targetA = createStore('');
    const targetB = createStore(0);

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    spread(source, {
      first: targetA,
      second: targetB,
    });

    source({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('store to stores', () => {
    const change = createEvent();
    const source = createStore({ first: 'hello', second: 200 }).on(
      change,
      (_, value) => value,
    );
    const targetA = createStore('');
    const targetB = createStore(0);

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    spread(source, {
      first: targetA,
      second: targetB,
    });

    change({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('store to events', () => {
    const change = createEvent();
    const source = createStore({ first: 'hello', second: 200 }).on(
      change,
      (_, value) => value,
    );
    const targetA = createEvent();
    const targetB = createEvent();

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    spread(source, {
      first: targetA,
      second: targetB,
    });

    change({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });
});

describe('spread(targets)', () => {
  test('event to events', () => {
    const source = createEvent();
    const targetA = createEvent();
    const targetB = createEvent();

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    forward({
      from: source,
      to: spread({
        first: targetA,
        second: targetB,
      }),
    });

    source({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('event to stores', () => {
    const source = createEvent();
    const targetA = createStore('');
    const targetB = createStore(0);

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    forward({
      from: source,
      to: spread({
        first: targetA,
        second: targetB,
      }),
    });

    source({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('store to stores', () => {
    const change = createEvent();
    const source = createStore({ first: 'hello', second: 200 }).on(
      change,
      (_, value) => value,
    );
    const targetA = createStore('');
    const targetB = createStore(0);

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    forward({
      from: source,
      to: spread({
        first: targetA,
        second: targetB,
      }),
    });

    change({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });

  test('store to events', () => {
    const change = createEvent();
    const source = createStore({ first: 'hello', second: 200 }).on(
      change,
      (_, value) => value,
    );
    const targetA = createEvent();
    const targetB = createEvent();

    const fnA = jest.fn();
    const fnB = jest.fn();
    targetA.watch(fnA);
    targetB.watch(fnB);

    forward({
      from: source,
      to: spread({
        first: targetA,
        second: targetB,
      }),
    });

    change({ first: 'Hello', second: 200 });

    expect(fnA).toBeCalledWith('Hello');
    expect(fnB).toBeCalledWith(200);
  });
});

test('no field in source', () => {
  const source = createEvent();
  const targetA = createEvent();
  const targetB = createEvent();

  const fnA = jest.fn();
  const fnB = jest.fn();
  targetA.watch(fnA);
  targetB.watch(fnB);

  spread(source, {
    first: targetA,
    second: targetB,
  });

  source({ second: 200 });

  expect(fnA).toBeCalledTimes(0);
  expect(fnB).toBeCalledWith(200);
});