"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class AuthRoute {
    constructor() {
        this.route = (0, express_1.Router)();
        this.controller = new auth_controller_1.default();
        this.init();
    }
    init() {
        this.route.post('/login', this.controller.login);
        this.route.post('/logout', this.controller.logout);
        this.route.post('/signup', this.controller.signup);
    }
    setupGlobalMiddleware() {
        throw new Error('Method not implemented.');
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map