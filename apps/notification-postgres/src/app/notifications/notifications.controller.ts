import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { NotificationsInterface, UserNotificationPayloadInterface } from "./models/notification.interface";
import { NotificationsService } from "./notifications.service";


@Controller('v1')
export class NotificationsController {

    constructor(private notificationService: NotificationsService) { }

    @Get('notifications')
    public getNotificatons() {
        return this.notificationService.getNotifications()
    }

    @Get('notification/user/:id')
    public getNotificationFor(@Param() param: { id: string }) {
        return this.notificationService.getNotificationFor(param.id.toString());
    }

    @Get('notifications/role/:user_role')
    public getUnAwaredNotificationsForRole(@Param() param: { user_role: string }) {
        return this.notificationService.getUnAwaredNotificationsForRole(param.user_role)
    }

    @Get('notifications/user/:id/roles/:user_roles')
    public getUnAwaredNotificationsForUserAndRole(@Param() param: { user_roles: string, id: string }) {
        return this.notificationService.getUnAwaredNotificationsForUserAndRole(param)
    }

    @Post('notification')
    create(@Body() notification: NotificationsInterface) {
        console.table(notification)
        return this.notificationService.setNotification(notification);
    }

    @Patch('notification')
    updateNotificationAsAwaredForRole(@Body() payload: UserNotificationPayloadInterface) {

        return this.notificationService.setNotificationAsAwared(payload);
    }

}