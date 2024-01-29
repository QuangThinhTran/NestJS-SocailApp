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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Blog = class Blog {
};
exports.Blog = Blog;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Blog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Blog.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Blog.prototype, "deleted_at", void 0);
exports.Blog = Blog = __decorate([
    (0, typeorm_1.Entity)('blogs')
], Blog);
//# sourceMappingURL=blog.entity.js.map