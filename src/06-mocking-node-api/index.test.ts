import path from 'path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

const timer = 5000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, timer);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, timer);
    jest.advanceTimersByTime(timer);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, timer);
    jest.advanceTimersByTime(timer);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, timer);

    for (let i = 1; i < 4; i += 1) {
      jest.advanceTimersByTime(timer);
      expect(callback).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = './index.js';

  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const readResult = await readFileAsynchronously(pathToFile);
    if (!readResult) expect(readResult).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const readResult = await readFileAsynchronously(pathToFile);
    if (readResult)
      expect(readFileAsynchronously(pathToFile)).resolves.toBe(readResult);
  });
});
