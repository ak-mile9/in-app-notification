import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('readed_notification')
export class ReadedNotificationEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    user_id: string

    @Column()
    notification_id: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date;

}