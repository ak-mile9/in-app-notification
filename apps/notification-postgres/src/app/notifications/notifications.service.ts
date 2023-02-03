import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { In, Repository } from "typeorm";
import { KafkaProducerService } from "../notification-kafka/producer.service";
import { NotificationEntity } from "./models/notification.entity";
import { NotificationsInterface, UserNotificationPayloadInterface } from "./models/notification.interface";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,
        private readonly kafkaProducer: KafkaProducerService) { }


    getNotifications(): Observable<NotificationsInterface[]> {
        return from(this.notificationRepository.find())
    }

    getNotificationFor(id: string): Observable<NotificationsInterface[]> {
        return from(this.notificationRepository.find({ where: [{ user: id }] }))
    }
    getUnAwaredNotificationsForRole(for_roles: string): Observable<NotificationsInterface[]> {
        const roles = for_roles.split(",")
        return from(this.notificationRepository.find({ where: [{ for_role: In(roles), is_aware_of: false }] }))
    }

    getUnAwaredNotificationsForUserAndRole(param: { user_roles: string, id: string }) {
        const roles = param.user_roles.split(",")
        return from(this.notificationRepository.find({
            where: [
                {
                    user: param.id,
                    for_role: In(roles),
                    is_aware_of: false
                }
            ]
        }))
    }
    setNotification(notification: NotificationsInterface): Observable<NotificationsInterface> {
        this.kafkaProducer.produce({ topic: 'create-notification', messages: [{ value: JSON.stringify(notification) }] })

        return from(this.notificationRepository.save(notification))
    }

    async setNotificationAsAwared(payload: UserNotificationPayloadInterface) {
        const { for_role, user } = payload;
        console.table(payload)
        const update = await this.notificationRepository
            .createQueryBuilder()
            .update(NotificationEntity)
            .set({ is_aware_of: true })
            .where('user = :user', { user: user.toString() })
            .andWhere("for_role = :for_role", { for_role: for_role }).execute();
        if (update.affected > 0) {
            return {
                message: 'Updated sccessfully'
            }
        }
        this.kafkaProducer.produce({ topic: 'update-notification', messages: [{ value: 'notificationCreated' }] })

        return {
            message: "something went wrong"
        };

    }
}