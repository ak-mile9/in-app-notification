import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaModule } from "../notification-kafka/kafka.module";
import { KafkaProducerService } from "../notification-kafka/producer.service";
import { NotificationEntity } from "./models/notification.entity";
import { ReadedNotificationEntity } from "./models/readed-notification.entity";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity, ReadedNotificationEntity]), KafkaModule],
    controllers: [NotificationsController],
    providers: [NotificationsService, KafkaProducerService]
})
export class NotificationsModule { }