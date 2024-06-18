"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const blacklistService_1 = __importDefault(require("../utils/blacklistService"));
const createUser = async (name, email, initialBalance) => {
    // Check if the user is on the blacklist
    const isBlacklisted = await blacklistService_1.default.checkBlacklist(email);
    if (isBlacklisted) {
        throw new Error('User is blacklisted');
    }
    const [userId] = await (0, db_1.default)('users').insert({
        name,
        email,
        balance: initialBalance,
    });
    return getUser(userId);
};
const getUser = async (userId) => {
    const user = await (0, db_1.default)('users').where({ id: userId }).first();
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.default = { createUser, getUser };
