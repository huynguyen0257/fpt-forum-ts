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
exports.ClassController = void 0;
const decko_1 = require("decko");
const appError_1 = require("@/utils/appError");
const type_1 = require("@/utils/type");
const inversify_1 = __importDefault(require("@/loaders/inversify"));
class ClassController {
    constructor() {
        this._classService = inversify_1.default.container.get(type_1.TYPES.IClassService);
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classRes = yield this._classService.findById(req.params.id);
                if (classRes) {
                    return res.status(200).json(classRes);
                }
                return res.status(404).json({ message: 'Not Found' });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.query;
                const queryOptions = code
                    ? {
                        code: {
                            $regex: code,
                            $options: 'i'
                        }
                    }
                    : {};
                const classes = this._classService.find(queryOptions);
                return res.status(200).json(yield classes);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, maxStudent } = req.body;
                const result = yield this._classService.create({ code, maxStudent });
                return res.status(201).json({ message: 'Create successful' });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield this._classService.findById(req.body.id);
                const { code, maxStudent } = req.body;
                if (model) {
                    const result = yield this._classService.update(model._id, {
                        code,
                        maxStudent
                    });
                    return res.status(200).json({ message: 'Update successful' });
                }
                return next(new appError_1.ErrorMsg(404, 'Not Found'));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield this._classService.findById(req.params.id);
                if (model) {
                    const code = model.code;
                    yield this._classService.delete(model._id);
                    return res.status(200).json({ message: `Delete class code ${code}` });
                }
                return next(new appError_1.ErrorMsg(404, 'Not Found'));
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getById", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAll", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "remove", null);
exports.ClassController = ClassController;
//# sourceMappingURL=class.controller.js.map