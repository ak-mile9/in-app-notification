import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('notifications_for_user')
export class NotificationEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string

    @Column({ default: null })
    message: string;

    @Column({ default: '' })
    for_role: string;

    @Column('boolean', { default: false })
    is_aware_of: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })

    created_at?: Date;

}