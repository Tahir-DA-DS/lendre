"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTransactionsByUserId = exports.createTransaction = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createTransaction = async (userId, amount, type) => {
    const [transaction] = await (0, db_1.default)('transactions').insert({ user_id: userId, amount, type }).returning('*');
    return transaction;
};
exports.createTransaction = createTransaction;
const findTransactionsByUserId = async (userId) => {
    const transactions = await (0, db_1.default)('transactions').where({ user_id: userId });
    return transactions;
};
exports.findTransactionsByUserId = findTransactionsByUserId;
