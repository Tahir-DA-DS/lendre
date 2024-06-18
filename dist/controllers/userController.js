"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const createUser = async (req, res) => {
    const { name, email, initialBalance } = req.body;
    try {
        const user = await userService_1.default.createUser(name, email, initialBalance);
        res.status(201).json(user);
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'error creating user';
        res.status(404).json({ error: errorMessage });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        if (isNaN(userId)) {
            throw new Error('Invalid user ID');
        }
        const user = await userService_1.default.getUser(userId);
        res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        res.status(404).json({ error: errorMessage });
    }
};
exports.getUser = getUser;
exports.default = { createUser: exports.createUser, getUser: exports.getUser };
