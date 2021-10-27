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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../config"));
const appError_1 = require("@/utils/appError");
const routes_1 = __importDefault(require("@/api/routes"));
class ExpressLoader {
    constructor(app) {
        this._app = app;
        this.setupViewEngine();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupHandleUndefinedRoutes();
    }
    setupViewEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.use(express_1.default.json());
            this._app.use(express_1.default.urlencoded({ extended: false }));
            this._app.use((0, cookie_parser_1.default)());
        });
    }
    setupMiddleware() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.use((req, res, next) => {
                req.body = (0, camelcase_keys_1.default)(req.body, { deep: true });
                req.params = (0, camelcase_keys_1.default)(req.params);
                req.query = (0, camelcase_keys_1.default)(req.query);
                next();
            });
            this._app.use((req, res, next) => {
                logger_1.default.info(`${req.method} ${req.originalUrl}`);
                next();
            });
        });
    }
    setupRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.use(config_1.default.api.prefix, new routes_1.default().route);
        });
    }
    setupHandleUndefinedRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app.use('*', (req, res, next) => {
                //   const err = new AppError(404, "fail", "undefined route");
                const err = new appError_1.ErrorMsg(404, 'Undefined route');
                next(err);
            });
            // error handlers
            this._app.use((err, req, res, next) => {
                /**
                 * Handle 401 thrown by express-jwt library
                 */
                if (err.name === 'UnauthorizedError') {
                    return res.status(err.status).send({ message: err.message }).end();
                }
                return next(err);
            });
            this._app.use((err, req, res, next) => {
                err.status = err.status || 500;
                if (err.status === 500) {
                    logger_1.default.error(err);
                    logger_1.default.error(err.stack);
                }
                res
                    .status(err.status)
                    .json({
                    error: err.message || err
                })
                    .end();
            });
        });
    }
    get app() {
        return this._app;
    }
}
exports.default = ExpressLoader;
//# sourceMappingURL=express.js.map