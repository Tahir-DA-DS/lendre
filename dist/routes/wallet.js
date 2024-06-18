"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const walletController_1 = require("../controllers/walletController");
const router = (0, express_1.Router)();
router.post('/fund', walletController_1.fundAccount);
router.post('/transfer', walletController_1.transferFunds);
router.post('/withdraw', walletController_1.withdrawFunds);
exports.default = router;
