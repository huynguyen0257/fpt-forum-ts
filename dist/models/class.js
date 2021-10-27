"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = require("mongoose");
/**
 * Main class config "Class" model to mongoDB
 * Add more funciton & middle to "Class" model
 * Provide "Class" Model for interact with mongoDb via mongoose
 */
class Class {
}
exports.Class = Class;
_a = Class;
// static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
(() => {
    const schema = new mongoose_1.Schema({
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },
        maxStudent: {
            type: Number,
            required: true
        },
        students: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    });
    schema.statics.build = (data) => {
        return new _a.model(data);
    };
    _a.model = (0, mongoose_1.model)('Class', schema);
})();
//# sourceMappingURL=class.js.map