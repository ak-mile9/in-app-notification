import { NotificationInterface, NotificationResponseInterface } from "../types/message"
import { StyledTable, Grid } from "./style"


enum RolesInterface {
    VSP_ROLE_A = "VSP_ROLE_A",
    VSP_ROLE_B = "VSP_ROLE_B"
}
type EventRecordsTypeInterface = {
    notifications: NotificationInterface[];
}

export const EventRecords: React.FC<EventRecordsTypeInterface> = ({ notifications }) => {
    return (
        <div style={{ "display": "none" }}>
            Existing Records of Notification
            <Grid>
                <StyledTable>
                    <thead>
                        <th>Sno</th>
                        <th>Message</th>
                        <th>For User Role</th>
                        <th>Read By</th>
                    </thead>
                    <tbody>
                        {
                            notifications.map((d, i) => {
                                return <tr key={`row_${i}`}>
                                    <td>{i + 1}</td>
                                    <td>{d.title}</td>
                                    <td>{d.for_role}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </StyledTable>
            </Grid>
        </div>
    )
}