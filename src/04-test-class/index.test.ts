// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(150)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(50).transfer(100, getBankAccount(50))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account1 = getBankAccount(50);
    expect(() => account1.transfer(50, account1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account1 = getBankAccount(50);
    account1.deposit(50);
    expect(account1.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const account1 = getBankAccount(50);
    account1.withdraw(50);
    expect(account1.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(20);
    account1.transfer(30, account2);
    expect(account1.getBalance()).toBe(20);
    expect(account2.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);

    const account = getBankAccount(50);
    const balance = await account.fetchBalance();
    expect(typeof balance).toEqual('number');

    jest.spyOn(lodash, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => 50;
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(typeof balance).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
