"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_controller_1 = require("../controllers/class.controller");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
class ClassRoute {
    constructor() {
        this.route = (0, express_1.Router)();
        this.controller = new class_controller_1.ClassController();
        this.init();
    }
    /**
     * init all route to ClassController
     * Middleware as well
     */
    init() {
        this.setupGlobalMiddleware();
        this.route.get('/', this.controller.getAll);
        this.route.get('/:id', (0, express_validator_1.param)('id').isString(), middlewares_1.ValidateRequest.validateRequest, this.controller.getById);
        this.route.post('/', (0, express_validator_1.body)('code')
            .isString()
            .withMessage('code is a string')
            .isUppercase()
            .withMessage('Please upper case'), (0, express_validator_1.body)('maxStudent').isNumeric(), middlewares_1.ValidateRequest.validateRequest, this.controller.create);
        this.route.put('/', (0, express_validator_1.body)('id').isString(), (0, express_validator_1.body)('code')
            .isString()
            .withMessage('code is a string')
            .isUppercase()
            .withMessage('Please upper case'), (0, express_validator_1.body)('maxStudent').isNumeric(), middlewares_1.ValidateRequest.validateRequest, this.controller.update);
        this.route.delete('/:id', (0, express_validator_1.param)('id').isString(), middlewares_1.ValidateRequest.validateRequest, this.controller.remove);
    }
    /**
     * Setup Middleware for all Class Controller
     */
    setupGlobalMiddleware() {
        //   this.router.use(middlewares.isAuth);
    }
}
exports.default = ClassRoute;
//# sourceMappingURL=class.route.js.map