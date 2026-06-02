import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/utils/base-repository/base_repository.repository';
import { TYPEORM } from 'src/database/database.provider';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@Inject(TYPEORM) dataSource: DataSource) {
        super(dataSource.getRepository(UserEntity));
    }

    /**
     * Join query example — LEFT JOIN with a related table via query builder.
     *
     * Pattern:
     *   qb.leftJoinAndSelect('alias.relation', 'relationAlias')
     *     .where('alias.column = :value', { value })
     *
     * Replace 'user.posts' with your actual relation property and adjust
     * the entity once you add @OneToMany / @ManyToOne decorators.
     *
     * @example
     *   const users = await userRepository.findUsersWithPosts('Admin');
     */
    async findUsersWithPosts(role: string): Promise<UserEntity[]> {
        return (
            this.repository
                .createQueryBuilder('user')
                // LEFT JOIN: include users even if they have no posts
                // .leftJoinAndSelect('user.posts', 'post')
                .where('user.role = :role', { role })
                .orderBy('user.createdAt', 'DESC')
                .getMany()
        );
    }

    /**
     * Aggregate join example — SUM with GROUP BY via raw query.
     * Uses totalEntriesCountQuery helper from literal_queries.ts.
     */
    async countByRole(): Promise<{ role: string; count: string }[]> {
        return this.repository
            .createQueryBuilder('user')
            .select('user.role', 'role')
            .addSelect('COUNT(user.id)', 'count')
            .groupBy('user.role')
            .getRawMany();
    }
}
