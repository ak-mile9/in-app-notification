import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { In, Repository } from "typeorm";
import { KafkaProducerService } from "../notification-kafka/producer.service";
import { NotificationEntity } from "./models/notification.entity";
import { NotificationsInterface, NotificationPayloadInterface, UserNotificationPayloadInterface } from "./models/notification.interface";
import { ReadedNotificationEntity } from "./models/readed-notification.entity";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,

        @InjectRepository(ReadedNotificationEntity)
        private readonly readedNotificationRepository: Repository<ReadedNotificationEntity>,

        private readonly kafkaProducer: KafkaProducerService) {

    }


    getNotifications(): Observable<NotificationEntity[]> {
        return from(this.notificationRepository.find())
    }

    getNotificationFor(id: number): Observable<NotificationEntity[]> {
        return from(this.notificationRepository.find({ where: [{ id }] }))
    }

    // async getUnAwaredNotificationsForRole(for_roles: string, user: string): Promise<Observable<NotificationsInterface[]>> {

    //     const roles = for_roles.split(",");

    //     const readedNotifications = await this.readedNotificationRepository.find({
    //         where: [{
    //             user_id: user,
    //         }]
    //     })


    //     const readedNotificationsId = readedNotifications.map(n => n.notification_id);
    //     console.log('readedNotificationsId', readedNotificationsId)

    //     const allNotifications = await this.notificationRepository.find()
    //     const deltaNotifications = allNotifications.filter(notificaiton => !readedNotificationsId.includes(notificaiton.id)) || []
    //     return from([deltaNotifications])

    //     //return from(this.notificationRepository.find({ where: [{ for_role: In(roles), is_aware_of: false }] }))
    // }

    async getUnAwaredNotificationsForUserAndRole(param: { user_roles: string, userid: string }) {
        const { userid, user_roles } = param;
        const roles = user_roles.split(",")
        const allNotifications = await this.notificationRepository.find({
            where: [
                {
                    for_role: In(roles)
                }
            ]
        });
        const readedNotificationByThisUser = await this.readedNotificationRepository.find({
            where: [{
                user_id: userid
            }]
        })
        const readedNotificationId = readedNotificationByThisUser.map(notificaiton => notificaiton.notification_id);

        const unreadedNotifications = allNotifications.filter(notificaion => !readedNotificationId.includes(notificaion.id) && roles.includes(notificaion.for_role))
        console.log('data Service', unreadedNotifications)
        return unreadedNotifications
    }
    async setNotification(notification: NotificationPayloadInterface) {
        const toProduce = notification.for_roles.map(role => {
            return {
                ...notification,
                for_role: role
            }
        })

        this.kafkaProducer.produce({
            topic: 'create-notification', messages: [...toProduce.map(produce => {
                return { value: JSON.stringify(produce) }
            })]
        })
        const notificationToSave: NotificationsInterface[] = toProduce.map(notificaion => {
            delete notificaion.for_roles;
            return notificaion;
        })
        const saveNotifications = await this.notificationRepository
            .createQueryBuilder().insert()
            .into(NotificationEntity)
            .values([...notificationToSave]).execute()
        if (saveNotifications.generatedMaps.length > 0) {
            return {
                message: 'saved sccessfully'
            }
        }
        return {
            message: 'something went'
        }
    }

    async setNotificationAsAwared(payload: UserNotificationPayloadInterface) {
        const { for_role, user } = payload;
        /**
         * This is about user having features
         * eg. if any user were assigned to any role/feature and now it is removed.
         * then he/she will no more receive any notification to  the role which he/she was part of
         */
        const allNotifications = await this.notificationRepository.find({
            where: [{
                for_role: In(for_role)
            }]
        })
        const readedNotifications = await this.readedNotificationRepository.find({
            where: [{
                user_id: user
            }]
        })

        const readedNotificationId = readedNotifications.map(readedNotification => readedNotification.notification_id);
        const allNotificationsWhichAreNotReadedForThisUser = []
        allNotifications.forEach(unreaded => {
            if (!readedNotificationId.includes(unreaded.id)) {
                allNotificationsWhichAreNotReadedForThisUser.push({
                    notification_id: unreaded.id,
                    user_id: user
                })
            }
        })
        //console.log('allNotificationsWhichAreNotReadedForThisUser', allNotificationsWhichAreNotReadedForThisUser)
        const updateReadedNotificaiton = await this.readedNotificationRepository.createQueryBuilder()
            .insert().into(ReadedNotificationEntity)
            .values([...allNotificationsWhichAreNotReadedForThisUser]).execute();

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