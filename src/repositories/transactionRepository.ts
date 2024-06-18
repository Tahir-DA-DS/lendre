import knex from '../utils/db';
import Transaction from '../models/transactionModel';

const createTransaction = async (userId: number, amount: number, type: string): Promise<Transaction> => {
  const [transaction] = await knex('transactions').insert({ user_id: userId, amount, type }).returning('*');
  return transaction;
};

const findTransactionsByUserId = async (userId: number): Promise<Transaction[]> => {
  const transactions = await knex('transactions').where({ user_id: userId });
  return transactions;
};



export { createTransaction, findTransactionsByUserId };
