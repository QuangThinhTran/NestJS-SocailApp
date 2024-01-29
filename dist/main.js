"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const logger_service_1 = require("./services/logger.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(new logger_service_1.LoggerService);
    app.useGlobalPipes(new common_1.ValidationPipe);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Social API')
        .addBearerAuth()
        .setDescription('API Description')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/swagger', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map