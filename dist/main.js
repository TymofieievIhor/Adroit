"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./common/env/constant");
const local_variables_1 = require("./common/env/local-variables");
{
    if (constant_1.TypedEnv.LOCAL_RUN) {
        Object.assign(constant_1.TypedEnv, local_variables_1.localVariables);
    }
    else if (constant_1.TypedEnv.PROD_RUN) {
    }
}
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./modules/auth/roles/roles.guard");
const global_exception_filter_1 = require("./common/error-handling/global-exception.filter");
const http_exception_filter_1 = require("./common/error-handling/http-exception.filter");
const common_1 = require("@nestjs/common");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(new core_1.Reflector()));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Adroit System')
        .setDescription('The Adroit API description')
        .setVersion('1.0')
        .addBearerAuth()
        .setSchemes(constant_1.TypedEnv.SWAGGER_HTTPS === 'true' ? 'https' : 'http')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api', app, document);
    app.use(cors());
    await app.listen(constant_1.TypedEnv.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map