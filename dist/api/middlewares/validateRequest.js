"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const appError_1 = require("@/utils/appError");
const express_validator_1 = require("express-validator");
class ValidateRequest {
    static validateRequest(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new appError_1.ErrorMsg(400, errors.array()));
        }
        return next();
    }
}
exports.ValidateRequest = ValidateRequest;
//# sourceMappingURL=validateRequest.js.map