"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.createUser = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createUser = async (name, email, initialBalance) => {
    const [user] = await (0, db_1.default)('users').insert({ name, email, balance: initialBalance }).returning('*');
    return user;
};
exports.createUser = createUser;
const findUserById = async (id) => {
    const user = await (0, db_1.default)('users').where({ id }).first();
    return user;
};
exports.findUserById = findUserById;
