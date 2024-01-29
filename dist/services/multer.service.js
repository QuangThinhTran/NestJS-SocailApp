"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOption = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
exports.multerOption = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST)), false;
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = './public';
            cb(null, uploadPath);
        },
        fileName: (req, file, cb) => {
            cb(null, `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`);
        }
    })
};
//# sourceMappingURL=multer.service.js.map