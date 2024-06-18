"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const fundAccount = async (userId, amount) => {
    return db_1.default.transaction(async (trx) => {
        await trx('users').where({ id: userId }).increment('balance', amount);
        const [transactionId] = await trx('transactions').insert({
            user_id: userId,
            amount,
            type: 'fund',
        });
        return getTransaction(transactionId);
    });
};
const transferFunds = async (fromUserId, toUserId, amount) => {
    return db_1.default.transaction(async (trx) => {
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
const withdrawFunds = async (userId, amount) => {
    return db_1.default.transaction(async (trx) => {
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
const getTransaction = async (transactionId) => {
    const transaction = await (0, db_1.default)('transactions').where({ id: transactionId }).first();
    if (!transaction) {
        throw new Error('Transaction not found');
    }
    return transaction;
};
exports.default = { fundAccount, transferFunds, withdrawFunds };
