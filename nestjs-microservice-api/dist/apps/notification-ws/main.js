/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/notification-ws/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/notification-ws/src/app/app.service.ts");
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

/***/ "./apps/notification-ws/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/notification-ws/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/notification-ws/src/app/app.service.ts");
const gateway_module_1 = __webpack_require__("./apps/notification-ws/src/app/gateway/gateway.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [gateway_module_1.GatewayModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/notification-ws/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to notification!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/notification-ws/src/app/gateway/gateway.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const consumer_service_1 = __webpack_require__("./apps/notification-ws/src/app/notification-kafka/consumer.service.ts");
const gateway_1 = __webpack_require__("./apps/notification-ws/src/app/gateway/gateway.ts");
let GatewayModule = class GatewayModule {
};
GatewayModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [gateway_1.MyGateway, consumer_service_1.KafkaConsumerService],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;


/***/ }),

/***/ "./apps/notification-ws/src/app/gateway/gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const consumer_service_1 = __webpack_require__("./apps/notification-ws/src/app/notification-kafka/consumer.service.ts");
let MyGateway = class MyGateway {
    constructor(consumer) {
        this.consumer = consumer;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('socket.id', socket.id);
            console.log('connected');
            console.log(`${socket.getMaxListeners()} max listler`);
        });
        /**
         *
         * emit the message to browser via websocket
         */
        this.consumer.consume('group-create-notification', {
            topics: ['create-notification']
        }, {
            eachMessage: ({ topic, partition, message }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log('-----message in ws----', message);
                // console.log({
                //   source: 'Create-Consumer in websocket',
                //   message: message.value.toString(),
                //   partition: partition.toString()
                // })
                this.onNewMessage(message.value, true);
            })
        });
    }
    onNewMessage(body, isDirect) {
        console.log('Body', body.toString());
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: isDirect ? JSON.stringify({
                data: {
                    notifications: [JSON.parse(body.toString())]
                }
            }) : JSON.parse(JSON.stringify(body, null, 2))
        });
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], MyGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], MyGateway.prototype, "onNewMessage", null);
MyGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof consumer_service_1.KafkaConsumerService !== "undefined" && consumer_service_1.KafkaConsumerService) === "function" ? _a : Object])
], MyGateway);
exports.MyGateway = MyGateway;


/***/ }),

/***/ "./apps/notification-ws/src/app/notification-kafka/consumer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaConsumerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const kafkajs_1 = __webpack_require__("kafkajs");
let KafkaConsumerService = class KafkaConsumerService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            brokers: ['localhost:9092']
        });
        this.consumers = [];
    }
    consume(groupId, topic, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const consumer = this.kafka.consumer({ groupId });
            yield consumer.connect().catch(e => console.log('Consumer connection error', e));
            yield consumer.subscribe(topic);
            yield consumer.run(config);
            this.consumers.push(consumer);
        });
    }
    onApplicationShutdown() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const consumer of this.consumers) {
                yield consumer.disconnect();
            }
        });
    }
};
KafkaConsumerService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], KafkaConsumerService);
exports.KafkaConsumerService = KafkaConsumerService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/websockets":
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "kafkajs":
/***/ ((module) => {

module.exports = require("kafkajs");

/***/ }),

/***/ "socket.io":
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

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
const app_module_1 = __webpack_require__("./apps/notification-ws/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 8888;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
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