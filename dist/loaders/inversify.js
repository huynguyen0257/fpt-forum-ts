"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_1 = require("@/utils/type");
const repositories_1 = require("@/repositories");
const class_service_1 = require("@/services/class.service");
const services_1 = require("@/services");
class InversifyLoader {
}
exports.default = InversifyLoader;
_a = InversifyLoader;
// Run when call with InversifyLoader.init()
(() => {
    _a.container = new inversify_1.Container();
    // Class Model
    _a.container
        .bind(type_1.TYPES.IClassRepository)
        .to(repositories_1.ClassRepository);
    _a.container.bind(type_1.TYPES.IClassService).to(class_service_1.ClassService);
    // User Model
    _a.container
        .bind(type_1.TYPES.IUserRepository)
        .to(repositories_1.UserRepository);
    _a.container.bind(type_1.TYPES.IUserService).to(services_1.UserService);
})();
//# sourceMappingURL=inversify.js.map