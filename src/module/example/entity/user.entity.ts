import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/utils/base-entity/base.entity';
import { User } from '../interface/user.interface';

@Entity({ name: 'user_entity' })
export class UserEntity extends BaseEntity implements User {
    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['Admin', 'SuperAdmin', 'User'] })
    role: string;

    @Column({ unique: true })
    email: string;

    @Column()
    street: string;

    @Column({ type: 'int' })
    postalCode: number;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    state: string;
}
