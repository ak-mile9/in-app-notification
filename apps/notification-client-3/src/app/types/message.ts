

interface NotificationResponseInterface {
    data: NotificationsInterface;
}

interface NotificationsInterface {
    notifications: NotificationInterface[]

}
interface NotificationInterface {
    title: string;
    for_role: string;

}
export {
    NotificationResponseInterface,
    NotificationInterface
}