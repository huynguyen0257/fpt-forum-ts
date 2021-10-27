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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const inversify_1 = require("inversify");
let BaseService = 
// Open/ Close Principle in SOLID which BaseService Open for extends but Close for modification
class BaseService {
    constructor(repository) {
        this._repository = repository;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.findById(id);
        });
    }
    findOne(cond) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.findOne(cond);
        });
    }
    find(cond, fields, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.find(cond, fields, options);
        });
    }
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.create(model);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = this._repository.updateOne(id, data);
            return (yield updateResult).acknowledged;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this._repository.deleteOne(id);
            return deleteResult.acknowledged;
        });
    }
};
BaseService = __decorate([
    (0, inversify_1.injectable)()
    // Open/ Close Principle in SOLID which BaseService Open for extends but Close for modification
    ,
    __metadata("design:paramtypes", [Object])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map