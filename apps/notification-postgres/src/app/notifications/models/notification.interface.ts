export interface NotificationsInterface {
    id?: number;
    title: string;

    user: string;
    for_role: string
    createdAt?: Date;
}

export enum Roles {
    RPROJECTA_ROLE_1 = "RPROJECTA_ROLE_1",
    RPROJECTA_ROLE_2 = "RPROJECTA_ROLE_2",
    RPROJECTA_ROLE_3 = "RPROJECTA_ROLE_3",
    RPROJECTA_ROLE_4 = "RPROJECTA_ROLE_4",
}

export interface UserNotificationPayloadInterface { user: string, for_role: string }