
import { useEffect, useState } from "react";

import io from 'socket.io-client';
import { NotificationInterface, NotificationResponseInterface } from "../types/message";
import { EventRecords } from "./event-records";
import { HealthStatus } from "./health-status";


const EVENTS = {
    "CONNECT": 'connect',
    "DISCONNECT": 'disconnect',
    "NEW_MESSAGE": "onMessage",
    "CLIENT_INFO": 'storeClientInfo'
}
const BASE_URL = 'http://localhost:3333/v1';
const socket = io("http://localhost:8888");
export const Notification: React.FC<{ userId: string; user_role: string[] }> = ({ userId, user_role }) => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
    const [unReadedNotification, setUnreadedNotificaion] = useState<NotificationInterface[]>([]);
    const [socketId, setSocketId] = useState<string | null>(null);
    const fetchNotifications = () => {

        //  fetch(`${BASE_URL}/notifications/user/${userId}/roles/${user_role}`)
        fetch(`${BASE_URL}/notifications/role/${user_role}`)
            .then(response => response.json())
            .then(data => {
                setUnreadedNotificaion([...unReadedNotification, ...data])
            });
    }

    useEffect(() => {
        socket.on(EVENTS.CONNECT, (e) => {
            console.log("connected")
            setIsConnected(true);

            // join room
            setSocketId(socket.id)
            socket.emit(EVENTS.CLIENT_INFO, { userId: userId, feature_roles: user_role })
        })
        socket.on(EVENTS.DISCONNECT, () => {
            console.log("dis-connected")
            setIsConnected(false);
            // disconnect from room
        })
        socket.io.on("ping", () => {
            console.log("packet received from server")
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on(EVENTS.NEW_MESSAGE, (body) => {
            const { data }: NotificationResponseInterface = JSON.parse(body.content)
            setNotifications(data.notifications);
        })
        fetchNotifications()
        return () => {
            socket.off(EVENTS.CONNECT);
            socket.off(EVENTS.DISCONNECT);
            socket.off(EVENTS.NEW_MESSAGE);

        }

    }, [])

    useEffect(() => {
        setUnreadedNotificaion([...unReadedNotification, ...notifications]);
    }, [notifications])


    const onNotificaitonCheckedClickHandler = () => {
        fetch(`${BASE_URL}/notification`, {
            method: 'PATCH',
            body: JSON.stringify({
                user: userId,
                for_role: user_role
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())

    }

    // const markNotificationRead = () => {
    //     socket.emit(EVENTS.MESSAGE_READ_BY)
    // }

    return (
        <>
            <div style={{ "border": "5px solid green", "height": "50px" }}>userId:{userId}   user_role: {user_role.join(',')}</div>
            <HealthStatus isConnected={isConnected} newCount={unReadedNotification.length} onNotificationChecked={onNotificaitonCheckedClickHandler} />

            <EventRecords notifications={unReadedNotification} />

        </>
    );
}
