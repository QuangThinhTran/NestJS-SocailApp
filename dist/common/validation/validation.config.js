"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationConfig = void 0;
const common_1 = require("@nestjs/common");
exports.validationConfig = {
    whitelist: true,
    errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    skipMissingProperties: false,
};
//# sourceMappingURL=validation.config.js.map