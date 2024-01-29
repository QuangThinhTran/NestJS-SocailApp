"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.databaseOptions = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNCHRONIZE,
    migrations: ['src/database/migrations/*.ts'],
    migrationsRun: true,
};
const dataSource = new typeorm_1.DataSource(exports.databaseOptions);
//# sourceMappingURL=database.config.js.map