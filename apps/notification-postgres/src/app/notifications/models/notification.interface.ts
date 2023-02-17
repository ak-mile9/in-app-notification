export interface NotificationsInterface {
    id?: number;
    title: string;
    for_role: string;
    message: string;
    createdAt?: Date;
}
export interface NotificationPayloadInterface {

    title: string;
    message: string;
    for_roles: string[];
}
export enum Roles {
    RPROJECTA_ROLE_1 = "RPROJECTA_ROLE_1",
    RPROJECTA_ROLE_2 = "RPROJECTA_ROLE_2",
    RPROJECTA_ROLE_3 = "RPROJECTA_ROLE_3",
    RPROJECTA_ROLE_4 = "RPROJECTA_ROLE_4",
}

export interface UserNotificationPayloadInterface { user: string, for_role: string[] }