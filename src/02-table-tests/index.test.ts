// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 5, action: Action.Add, expected: 8 },
  { a: 3, b: 5, action: Action.Subtract, expected: -2 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 2, action: 'invalid', expected: null },
  { a: '3', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('calculates', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
