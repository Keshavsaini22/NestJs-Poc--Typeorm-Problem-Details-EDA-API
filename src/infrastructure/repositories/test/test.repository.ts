import { Injectable } from '@nestjs/common';
import { Test } from 'src/domain/test/test.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TestRepository extends Repository<Test> {
  constructor(dataSource: DataSource) {
    super(Test, dataSource.createEntityManager());
  }
}
