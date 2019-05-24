"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../common/helpers/auth/constants");
exports.Roles = (...roles) => common_1.ReflectMetadata(constants_1.ROLES_METAKEY, roles);
//# sourceMappingURL=roles.decorator.js.map