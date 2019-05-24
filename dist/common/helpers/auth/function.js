"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPasswordSecureEnough(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}
exports.isPasswordSecureEnough = isPasswordSecureEnough;
//# sourceMappingURL=function.js.map