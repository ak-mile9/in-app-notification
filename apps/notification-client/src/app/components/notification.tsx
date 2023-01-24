import { useEffect, useState } from "react";

import io from 'socket.io-client';
import { NotificationInterface, NotificationResponseInterface } from "../types/message";
import { EventRecords } from "./event-records";
import { HealthStatus } from "./health-status";

const userId = '1';
const user_role = 'RPROJECTA_ROLE_1'
const EVENTS = {
    "CONNECT": 'connect',
    "DISCONNECT": 'disconnect',
    "NEW_MESSAGE": "onMessage",
    "MESSAGE_READ_BY": `MESSAGE_READ_BY_${userId}`
}
const BASE_URL = 'http://localhost:3333/v1';
const socket = io("http://localhost:8888");

export function Notification() {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
    const [unReadedNotification, setUnreadedNotificaion] = useState<NotificationInterface[]>([]);
    const fetchNotifications = () => {

        fetch(`${BASE_URL}/notifications/user/${userId}/roles/${user_role}`)
            .then(response => response.json())
            .then(data => {
                setUnreadedNotificaion([...unReadedNotification, ...data])
            });
    }

    useEffect(() => {
        socket.on(EVENTS.CONNECT, () => {
            console.log("connected")
            setIsConnected(true);
        })
        socket.on(EVENTS.DISCONNECT, () => {
            console.log("dis-connected")
            setIsConnected(false);
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
            <HealthStatus isConnected={isConnected} newCount={unReadedNotification.length} onNotificationChecked={onNotificaitonCheckedClickHandler} />

            <EventRecords notifications={unReadedNotification} />

        </>
    );
}
