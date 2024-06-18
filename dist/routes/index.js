"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const walletController_1 = __importDefault(require("../controllers/walletController"));
const router = (0, express_1.Router)();
// User routes
router.post('/users', userController_1.default.createUser);
router.get('/users/:userId', userController_1.default.getUser);
// Wallet routes
router.post('/wallets/fund', walletController_1.default.fundAccount);
router.post('/wallets/transfer', walletController_1.default.transferFunds);
router.post('/wallets/withdraw', walletController_1.default.withdrawFunds);
exports.default = router;
