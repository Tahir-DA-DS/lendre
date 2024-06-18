import knex from '../utils/db';

const fundAccount = async (userId: number, amount: number) => {
  return knex.transaction(async (trx) => {
    await trx('users').where({ id: userId }).increment('balance', amount);

    const [transactionId] = await trx('transactions').insert({
      user_id: userId,
      amount,
      type: 'fund',
    });

    return getTransaction(transactionId);
  });
};

const transferFunds = async (fromUserId: number, toUserId: number, amount: number) => {
  return knex.transaction(async (trx) => {
    const sender = await trx('users').where({ id: fromUserId }).first();
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await trx('users').where({ id: fromUserId }).decrement('balance', amount);
    await trx('users').where({ id: toUserId }).increment('balance', amount);

    const [transactionId] = await trx('transactions').insert({
      user_id: fromUserId,
      amount,
      type: 'transfer',
      to_user_id: toUserId,
    });

    return getTransaction(transactionId);
  });
};

const withdrawFunds = async (userId: number, amount: number) => {
  return knex.transaction(async (trx) => {
    const user = await trx('users').where({ id: userId }).first();
    if (user.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await trx('users').where({ id: userId }).decrement('balance', amount);

    const [transactionId] = await trx('transactions').insert({
      user_id: userId,
      amount,
      type: 'withdraw',
    });

    return getTransaction(transactionId);
  });
};

const getTransaction = async (transactionId: number) => {
  const transaction = await knex('transactions').where({ id: transactionId }).first();
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};

export default { fundAccount, transferFunds, withdrawFunds };
