"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
class User {
}
exports.User = User;
_a = User;
// static block, run when runtime load all files - Only file use in 'import' keyword, belong to /src/app.ts
(() => {
    const schema = new mongoose_1.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        phoneNumber: {
            type: String,
            required: true,
            match: [
                /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                'Please fill in a valid phone number'
            ]
        },
        emailAddress: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address'
            ]
        },
        classes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Class' }]
    });
    schema.statics.build = (data) => {
        return new _a.model(data);
    };
    _a.model = (0, mongoose_1.model)('User', schema);
})();
//# sourceMappingURL=user.js.map