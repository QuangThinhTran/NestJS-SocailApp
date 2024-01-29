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
exports.BaseEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const blog_entity_1 = require("../../blog/entities/blog.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let BaseEntity = class BaseEntity {
};
exports.BaseEntity = BaseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => blog_entity_1.Blog, (blog) => blog.id, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "blog_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "deletedAt", void 0);
exports.BaseEntity = BaseEntity = __decorate([
    (0, typeorm_1.Entity)('comments')
], BaseEntity);
//# sourceMappingURL=comment.entity.js.map