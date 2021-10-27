"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const decko_1 = require("decko");
const inversify_1 = __importDefault(require("@/loaders/inversify"));
const type_1 = require("@/utils/type");
const appError_1 = require("@/utils/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("@/config"));
class AuthController {
    constructor() {
        this._userService = inversify_1.default.container.get(type_1.TYPES.IUserService);
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield this._userService.findOne({ username });
                if (!user || !(yield this._userService.checkPassword(password, user))) {
                    return next(new appError_1.ErrorMsg(401, 'Username or Password is wrong'));
                }
                // Generate token
                const token = this.createToken(user._id);
                user.password = undefined;
                user.classes = undefined;
                return res.status(200).json({
                    token,
                    user
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, emailAddress, phoneNumber, fullName } = req.body;
                let user = yield this._userService.findOne({ username });
                if (user) {
                    return next(new appError_1.ErrorMsg(401, 'Username is existed!'));
                }
                user = yield this._userService.create({
                    username,
                    password,
                    emailAddress,
                    phoneNumber,
                    fullName
                });
                // Generate token
                const token = this.createToken(user._id);
                user.password = undefined;
                return res.status(200).json({
                    token,
                    user
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({ message: 'Logout' });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    createToken(id) {
        return jsonwebtoken_1.default.sign({
            id
        }, config_1.default.jwtSecret, {
            expiresIn: config_1.default.jwtExpiresIn
        });
    }
}
__decorate([
    (0, decko_1.bind)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, decko_1.bind)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, decko_1.bind)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map