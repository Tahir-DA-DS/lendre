"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const checkBlacklist = async (email) => {
    const response = await axios_1.default.get(`https://api.lendsqr.com/adjutor/karma/${email}`, {
        headers: {
            Authorization: `Bearer ${process.env.LENDSQL_API_KEY}`,
        },
    });
    return response.data.blacklisted;
};
exports.default = { checkBlacklist };
