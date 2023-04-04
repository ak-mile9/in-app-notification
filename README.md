1) user table
2) notificaiton table



 Tables
    
**Notification**

| id | message        | for_role   |   |   |   |   |   |   |   |
|----|----------------|------------|---|---|---|---|---|---|---|
| N1  | first message  | VSP_ROLE_A |   |   |   |   |   |   |   |
| N2  | second message | VSP_ROLE_A |   |   |   |   |   |   |   |
| N3  | third message  | VSP_ROLE_A |   |   |   |   |   |   |   |
| N4  | fourth message | VSP_ROLE_A |   |   |   |   |   |   |   |
|    |                |            |  


**Users**

| user_id | user_name | role       |   |   |   |   |   |   |   |
|---------|-----------|------------|---|---|---|---|---|---|---|
| U1       | ABC       | VSP_ROLE_A |   |   |   |   |   |   |   |
| U2       | XYZ       | VSP_ROLE_A |   |   |   |   |   |   |   |
| U3       | User A    | VSP_ROLE_A |   |   |   |   |   |   |   |
| U4       | User B    | VSP_ROLE_A |   |   |   |   |   |   |   |



**readed_notifications**



| id | user_id | notification_id |   |   |   |   |   |   |   |
|----|---------|-----------------|---|---|---|---|---|---|---|
| 1  | ABC     | N1              |   |   |   |   |   |   |   |
| 2  | XYZ     | N1              |   |   |   |   |   |   |   |
| 3  | ABC     | N2              |   |   |   |   |   |   |   |
| 4  | ABC     | N3              |   |   |   |   |   |   |   |




**Flow Diagram**

![Alt Flow Diagram](./notification.drawio.svg)
