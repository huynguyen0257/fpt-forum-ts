"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const class_route_1 = __importDefault(require("./class.route"));
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
class MyRoute {
    constructor() {
        this._route = (0, express_1.Router)();
        this._route.use('/auth', new auth_route_1.default().route);
        this._route.use('/class', new class_route_1.default().route);
        this._route.use('/user', new user_route_1.default().route);
    }
    get route() {
        return this._route;
    }
}
exports.default = MyRoute;
//# sourceMappingURL=index.js.map