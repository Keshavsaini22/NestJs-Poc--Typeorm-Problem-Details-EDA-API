import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { ListDoctorDto } from 'src/feature/doctor/doctor.dto';
import { DataSource, Repository } from 'typeorm';

export type CreateDoctorType = {
  name: string;
  specialty: string;
};

@Injectable()
export class DoctorRepository extends Repository<Doctor> {
  constructor(dataSource: DataSource) {
    super(Doctor, dataSource.createEntityManager());
  }

  async saveDoctor(payload: CreateDoctorType): Promise<Doctor> {
    return await this.save(payload);
  }

  async listDoctors(payload: ListDoctorDto) {
    const { page = 1, limit = 10 } = payload;

    const offset = limit * (page - 1);

    let queryBuilder = this.createQueryBuilder();

    const [data, total] = await queryBuilder
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();

    return { data, total, current_page: page, per_page: limit };

    // const [data, total] = await this.findAndCount({
    //   skip: limit * (page - 1),
    //   take: limit,
    //   order: { created_at: 'DESC' },
    // });

    // return { data, total, current_page: page, per_page: limit };
  }
}
