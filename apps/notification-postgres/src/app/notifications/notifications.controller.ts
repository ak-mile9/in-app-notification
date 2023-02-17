import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { NotificationsInterface, NotificationPayloadInterface, UserNotificationPayloadInterface } from "./models/notification.interface";
import { NotificationsService } from "./notifications.service";


@Controller('v1')
export class NotificationsController {

    constructor(private notificationService: NotificationsService) { }

    @Get('notifications')
    public getNotificatons() {
        return this.notificationService.getNotifications()
    }

    @Get('notification/:id')
    public getNotificationFor(@Param() param: { id: number }) {
        return this.notificationService.getNotificationFor(param.id);
    }
    /**
     * 
     * @param param t
     * @returns 
     * this is confusing depricate this asap
     */
    // @Get('notifications/:user_id/role/:user_role')
    // public getUnAwaredNotificationsForRole(@Param() param: { user_id: string, user_role: string }) {
    //     console.log('param', param);
    //     return this.notificationService.getUnAwaredNotificationsForRole(param.user_role, param.user_id)
    // }

    @Get('notifications/user/:userid/roles/:user_roles')
    public async getUnAwaredNotificationsForUserAndRole(@Param() param: { user_roles: string, userid: string }) {
        const data = await this.notificationService.getUnAwaredNotificationsForUserAndRole(param)
        console.log('dataController', data)
        return data;
    }

    @Post('notification')
    create(@Body() notification: NotificationPayloadInterface) {

        return this.notificationService.setNotification(notification);
    }

    @Patch('notification')
    updateNotificationAsAwaredForRole(@Body() payload: UserNotificationPayloadInterface) {

        return this.notificationService.setNotificationAsAwared(payload);
    }

}