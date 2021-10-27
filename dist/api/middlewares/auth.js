"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@/config"));
const inversify_1 = __importDefault(require("@/loaders/inversify"));
const appError_1 = require("@/utils/appError");
const type_1 = require("@/utils/type");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static isAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
            let decode;
            if (
            // Check exist authorization token before use startsWith api
            req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
            else {
                return next(new appError_1.ErrorMsg(400, 'Missing Bearer token'));
            }
            if (!token) {
                return next(new appError_1.ErrorMsg(401, 'You are not logged in! Please login in to continue'));
            }
            // 2) Verify token
            try {
                decode = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret));
            }
            catch (error) {
                return next(new appError_1.ErrorMsg(401, 'Invalid Bearer token.'));
            }
            // 3) check if the user is exist (not deleted)
            try {
                const user = yield AuthMiddleware.userService.findById(decode.id);
                if (!user)
                    return next(new appError_1.ErrorMsg(401, 'This user is no longer exist.'));
                req.currentUser = user;
                next();
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = AuthMiddleware;
AuthMiddleware.userService = inversify_1.default.container.get(type_1.TYPES.IUserService);
//# sourceMappingURL=auth.js.map