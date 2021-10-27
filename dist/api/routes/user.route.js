"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
class UserRoute {
    constructor() {
        this.route = (0, express_1.Router)();
        this.controller = new controllers_1.UserController();
        this.setupGlobalMiddleware();
        this.init();
    }
    /**
     * init all route to UserController
     * Middleware as well
     */
    init() {
        this.route.get('/', this.controller.getAll);
        this.route.get('/:id', (0, express_validator_1.param)('id').isString(), middlewares_1.ValidateRequest.validateRequest, this.controller.getById);
        this.route.post('/', (0, express_validator_1.body)('username').isString().withMessage('code is required'), (0, express_validator_1.body)('password').isString().withMessage('password is required'), (0, express_validator_1.body)('fullName').isString().withMessage('fullName is required'), (0, express_validator_1.body)('phoneNumber')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
            .withMessage('phoneNumber is required'), (0, express_validator_1.body)('emailAddress').isEmail().withMessage('invalid email address'), middlewares_1.ValidateRequest.validateRequest, this.controller.create);
        this.route.put('/', (0, express_validator_1.body)('id').isString(), (0, express_validator_1.body)('code')
            .isString()
            .withMessage('code is a string')
            .isUppercase()
            .withMessage('Please upper case'), (0, express_validator_1.body)('maxStudent').isNumeric(), middlewares_1.ValidateRequest.validateRequest, this.controller.update);
        this.route.delete('/:id', (0, express_validator_1.param)('id').isString(), middlewares_1.ValidateRequest.validateRequest, this.controller.remove);
    }
    setupGlobalMiddleware() {
        this.route.use(auth_1.default.isAuth);
    }
}
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map