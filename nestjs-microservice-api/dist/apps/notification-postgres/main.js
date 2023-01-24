/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/notification-postgres/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/notification-postgres/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/notification-postgres/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const app_controller_1 = __webpack_require__("./apps/notification-postgres/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/notification-postgres/src/app/app.service.ts");
const notifications_module_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/notifications.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                autoLoadEntities: true,
                synchronize: true
            }),
            notifications_module_1.NotificationsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/notification-postgres/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to notification-postgres!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notification-kafka/kafka.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const producer_controler_1 = __webpack_require__("./apps/notification-postgres/src/app/notification-kafka/producer.controler.ts");
let KafkaModule = class KafkaModule {
};
KafkaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [producer_controler_1.KafkaController]
        // providers: [KafkaProducerService, KafkaConsumerService],
        // exports: [KafkaProducerService, KafkaConsumerService]
    })
], KafkaModule);
exports.KafkaModule = KafkaModule;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notification-kafka/models/interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/notification-postgres/src/app/notification-kafka/producer.controler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const interface_1 = __webpack_require__("./apps/notification-postgres/src/app/notification-kafka/models/interface.ts");
let KafkaController = class KafkaController {
    produce(payload) {
        return payload;
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('produce'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof interface_1.RecordsInterface !== "undefined" && interface_1.RecordsInterface) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], KafkaController.prototype, "produce", null);
KafkaController = tslib_1.__decorate([
    (0, common_1.Controller)('v1/kafka')
], KafkaController);
exports.KafkaController = KafkaController;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notification-kafka/producer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaProducerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const kafkajs_1 = __webpack_require__("kafkajs");
let KafkaProducerService = class KafkaProducerService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            brokers: ['localhost:9092']
        });
        this.producer = this.kafka.producer();
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Producer Service onModuleInit');
            yield this.producer.connect();
        });
    }
    produce(record) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Producer Service Produce');
            yield this.producer.send(record);
        });
    }
    onApplicationShutdown(signal) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Signal on shutDown', signal);
            yield this.producer.disconnect();
        });
    }
};
KafkaProducerService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], KafkaProducerService);
exports.KafkaProducerService = KafkaProducerService;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notifications/models/notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let NotificationEntity = class NotificationEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], NotificationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NotificationEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NotificationEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    tslib_1.__metadata("design:type", String)
], NotificationEntity.prototype, "for_role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NotificationEntity.prototype, "is_aware_of", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], NotificationEntity.prototype, "created_at", void 0);
NotificationEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('notifications_for_user')
], NotificationEntity);
exports.NotificationEntity = NotificationEntity;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notifications/models/notification.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["RPROJECTA_ROLE_1"] = "RPROJECTA_ROLE_1";
    Roles["RPROJECTA_ROLE_2"] = "RPROJECTA_ROLE_2";
    Roles["RPROJECTA_ROLE_3"] = "RPROJECTA_ROLE_3";
    Roles["RPROJECTA_ROLE_4"] = "RPROJECTA_ROLE_4";
})(Roles = exports.Roles || (exports.Roles = {}));


/***/ }),

/***/ "./apps/notification-postgres/src/app/notifications/notifications.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const notification_interface_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/models/notification.interface.ts");
const notifications_service_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/notifications.service.ts");
let NotificationsController = class NotificationsController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    getNotificatons() {
        return this.notificationService.getNotifications();
    }
    getNotificationFor(param) {
        return this.notificationService.getNotificationFor(param.id.toString());
    }
    getUnAwaredNotificationsForRole(param) {
        return this.notificationService.getUnAwaredNotificationsForRole(param.user_role);
    }
    getUnAwaredNotificationsForUserAndRole(param) {
        return this.notificationService.getUnAwaredNotificationsForUserAndRole(param);
    }
    create(notification) {
        console.table(notification);
        return this.notificationService.setNotification(notification);
    }
    updateNotificationAsAwaredForRole(payload) {
        return this.notificationService.setNotificationAsAwared(payload);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('notifications'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "getNotificatons", null);
tslib_1.__decorate([
    (0, common_1.Get)('notification/user/:id'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "getNotificationFor", null);
tslib_1.__decorate([
    (0, common_1.Get)('notifications/role/:user_role'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "getUnAwaredNotificationsForRole", null);
tslib_1.__decorate([
    (0, common_1.Get)('notifications/user/:id/roles/:user_roles'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "getUnAwaredNotificationsForUserAndRole", null);
tslib_1.__decorate([
    (0, common_1.Post)('notification'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof notification_interface_1.NotificationsInterface !== "undefined" && notification_interface_1.NotificationsInterface) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)('notification'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof notification_interface_1.UserNotificationPayloadInterface !== "undefined" && notification_interface_1.UserNotificationPayloadInterface) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NotificationsController.prototype, "updateNotificationAsAwaredForRole", null);
NotificationsController = tslib_1.__decorate([
    (0, common_1.Controller)('v1'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _a : Object])
], NotificationsController);
exports.NotificationsController = NotificationsController;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notifications/notifications.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const kafka_module_1 = __webpack_require__("./apps/notification-postgres/src/app/notification-kafka/kafka.module.ts");
const producer_service_1 = __webpack_require__("./apps/notification-postgres/src/app/notification-kafka/producer.service.ts");
const notification_entity_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/models/notification.entity.ts");
const notifications_controller_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/notifications.controller.ts");
const notifications_service_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/notifications.service.ts");
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notification_entity_1.NotificationEntity]), kafka_module_1.KafkaModule],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService, producer_service_1.KafkaProducerService]
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;


/***/ }),

/***/ "./apps/notification-postgres/src/app/notifications/notifications.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const rxjs_1 = __webpack_require__("rxjs");
const typeorm_2 = __webpack_require__("typeorm");
const producer_service_1 = __webpack_require__("./apps/notification-postgres/src/app/notification-kafka/producer.service.ts");
const notification_entity_1 = __webpack_require__("./apps/notification-postgres/src/app/notifications/models/notification.entity.ts");
let NotificationsService = class NotificationsService {
    constructor(notificationRepository, kafkaProducer) {
        this.notificationRepository = notificationRepository;
        this.kafkaProducer = kafkaProducer;
    }
    getNotifications() {
        return (0, rxjs_1.from)(this.notificationRepository.find());
    }
    getNotificationFor(id) {
        return (0, rxjs_1.from)(this.notificationRepository.find({ where: [{ user: id }] }));
    }
    getUnAwaredNotificationsForRole(for_role) {
        return (0, rxjs_1.from)(this.notificationRepository.find({ where: [{ for_role, is_aware_of: false }] }));
    }
    getUnAwaredNotificationsForUserAndRole(param) {
        return (0, rxjs_1.from)(this.notificationRepository.find({
            where: [
                {
                    user: param.id,
                    for_role: param.user_roles,
                    is_aware_of: false
                }
            ]
        }));
    }
    setNotification(notification) {
        this.kafkaProducer.produce({ topic: 'create-notification', messages: [{ value: JSON.stringify(notification) }] });
        return (0, rxjs_1.from)(this.notificationRepository.save(notification));
    }
    setNotificationAsAwared(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { for_role, user } = payload;
            console.table(payload);
            const update = yield this.notificationRepository
                .createQueryBuilder()
                .update(notification_entity_1.NotificationEntity)
                .set({ is_aware_of: true })
                .where('user = :user', { user: user.toString() })
                .andWhere("for_role = :for_role", { for_role: for_role }).execute();
            if (update.affected > 0) {
                return {
                    message: 'Updated sccessfully'
                };
            }
            this.kafkaProducer.produce({ topic: 'update-notification', messages: [{ value: 'notificationCreated' }] });
            return {
                message: "something went wrong"
            };
        });
    }
};
NotificationsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof producer_service_1.KafkaProducerService !== "undefined" && producer_service_1.KafkaProducerService) === "function" ? _b : Object])
], NotificationsService);
exports.NotificationsService = NotificationsService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "kafkajs":
/***/ ((module) => {

module.exports = require("kafkajs");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/notification-postgres/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        // const globalPrefix = 'v1';
        // app.setGlobalPrefix(globalPrefix);
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map