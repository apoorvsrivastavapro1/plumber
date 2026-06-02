import {
    BeforeInsert,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

/**
 * Abstract base entity extended by all feature entities.
 *
 * timestamps: true  → createdAt + updatedAt managed automatically by TypeORM
 * paranoid:   true  → deletedAt soft-delete column; rows are never physically
 *                     removed — TypeORM filters them out of every query automatically.
 *                     Use repository.softDelete() / repository.restore() to act on them.
 */
export abstract class BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // paranoid: true — TypeORM excludes rows where deletedAt IS NOT NULL from all finds
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @BeforeInsert()
    protected generateId() {
        if (!this.id) this.id = uuidv7();
    }
}
