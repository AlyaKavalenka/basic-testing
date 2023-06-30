// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 3, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Exponentiate })).toBe(
      25,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: 'puk' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: 5, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 3, b: false, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: null, b: 5, action: Action.Multiply }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 15, b: [2, 3], action: Action.Divide }),
    ).toBeNull();
    expect(
      simpleCalculator({
        a: { a: 2, b: 3 },
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBeNull();
  });
});
