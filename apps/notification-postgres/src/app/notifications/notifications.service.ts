import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectEntityManager } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { In, Repository } from "typeorm";
import { KafkaProducerService } from "../notification-kafka/producer.service";
import { NotificationEntity } from "./models/notification.entity";
import { NotificationsInterface, UserNotificationPayloadInterface } from "./models/notification.interface";
import { ReadedNotificationEntity } from "./models/readed-notification.entity";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,

        @InjectRepository(ReadedNotificationEntity)
        private readonly readedNotificationRepository: Repository<ReadedNotificationEntity>,

        private readonly kafkaProducer: KafkaProducerService) { }


    getNotifications(): Observable<NotificationsInterface[]> {
        return from(this.notificationRepository.find())
    }

    getNotificationFor(id: string): Observable<NotificationsInterface[]> {
        return from(this.notificationRepository.find({ where: [{ user: id }] }))
    }
    async getUnAwaredNotificationsForRole(for_roles: string): Promise<Observable<NotificationsInterface[]>> {
        const roles = for_roles.split(",");
        const user = 1;
        const readedNotifications = this.readedNotificationRepository.createQueryBuilder('a').select('notification_id').getSql();
        const deltaNotificaitons = await this.notificationRepository.createQueryBuilder('d').where("d.id not IN (" + readedNotifications + ")").execute()
        //console.log('readedNotifications', deltaNotificaitons)
        return deltaNotificaitons
        //return from(this.notificationRepository.find({ where: [{ for_role: In(roles), is_aware_of: false }] }))
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
        console.log({
            user,
            for_role: In(for_role),
            is_aware_of: false
        })
        const unReadedNotificationsForUser = await this.notificationRepository.find({
            where: [{
                user,
                for_role: In(for_role),
                is_aware_of: false
            }]
        })
        const toBeInserted = unReadedNotificationsForUser.map(unreaded => {
            return {
                user_id: unreaded.user,
                notification_id: unreaded.id
            }
        })
        const updateReadedNotificaiton = await this.readedNotificationRepository.createQueryBuilder()
            .insert().into(ReadedNotificationEntity)
            .values([...toBeInserted]).execute();
        console.log('updateReadedNotificaiton', updateReadedNotificaiton)
        // const update = await this.notificationRepository
        //     .createQueryBuilder()
        //     .update(NotificationEntity)
        //     .set({ is_aware_of: true })
        //     .where('user = :user', { user: user.toString() })
        //     .andWhere("for_role = :for_role", { for_role: for_role }).execute();
        if (updateReadedNotificaiton.generatedMaps.length > 0) {
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