"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFunds = exports.transferFunds = exports.fundAccount = void 0;
const walletService_1 = __importDefault(require("../services/walletService"));
const fundAccount = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const transaction = await walletService_1.default.fundAccount(userId, amount);
        res.status(200).json(transaction);
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'error funding';
        res.status(404).json({ error: errorMessage });
    }
};
exports.fundAccount = fundAccount;
const transferFunds = async (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;
    try {
        const transaction = await walletService_1.default.transferFunds(fromUserId, toUserId, amount);
        res.status(200).json(transaction);
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'transfer error';
        res.status(404).json({ error: errorMessage });
    }
};
exports.transferFunds = transferFunds;
const withdrawFunds = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const transaction = await walletService_1.default.withdrawFunds(userId, amount);
        res.status(200).json(transaction);
    }
    catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'withdrawal error';
        res.status(404).json({ error: errorMessage });
    }
};
exports.withdrawFunds = withdrawFunds;
exports.default = { fundAccount: exports.fundAccount, transferFunds: exports.transferFunds, withdrawFunds: exports.withdrawFunds };
