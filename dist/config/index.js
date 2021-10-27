"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config({
    path: './.env.example'
});
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: process.env.PORT || 3000,
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI,
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api/v1'
    },
    nodeEnv: process.env.NODE_ENV || 'product'
};
//# sourceMappingURL=index.js.map