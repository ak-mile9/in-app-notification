import { useEffect, useRef, useState } from "react";


const HealthState = {
    ONLINE: "#0DCE89",
    OFFLINE: "#FF0000"
}

export const HealthStatus = ({ isConnected, newCount, onNotificationChecked }: { isConnected: boolean, newCount: number, onNotificationChecked: () => void; }) => {
    const [currentNotificationCount, setNewNotification] = useState(newCount);
    const [isNewNotificaion, setNewNotificaion] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        if (newCount > currentNotificationCount) {
            setNewNotification(newCount)
            setNewNotificaion(true)
            setTimeout(() => setNewNotificaion(false), 3000);
        }
    }, [newCount])


    const Filler = isConnected ? HealthState.ONLINE : HealthState.OFFLINE;
    return (
        <div style={{ margin: "10%" }} onClick={() => {
            setShowNotification(true);
            onNotificationChecked();
        }}>
            <div className={`popover ${showNotification ? "popover--active" : ""}`} >
                <div className={`notifier `}>
                    <i className="bell fa fa-bell-o"></i>
                    {!showNotification && currentNotificationCount > 0 && <div className="badge green" >{currentNotificationCount}</div >}
                </div >
                <ul className="popover__menu">
                    <li className="popover__menu-item"><button>Action with a long title</button></li>
                    <li className="popover__menu-item"><button>Delete</button></li>
                </ul>
            </div>
        </div>
    )
}