import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    async seedingData(_dataSource: DataSource) {
        // Insert initial / seed data here using _dataSource.getRepository(Entity)
        return;
    }
}
