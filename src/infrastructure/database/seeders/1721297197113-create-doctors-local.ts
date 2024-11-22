import { ConfigService } from '@nestjs/config';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { DriveConfigurationService } from 'src/infrastructure/storage/drive-config';
import { StorageFileHandlerService } from 'src/infrastructure/storage/file-storage-service';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class DoctorSeeder implements Seeder {
  private storageService: StorageFileHandlerService;
  private configService: ConfigService;
  private programsSeedFilePath: string;
  private fileName: string = 'doctors.json';
  constructor() {
    this.storageService = new StorageFileHandlerService(
      new ConfigService(),
      new DriveConfigurationService(),
    );
    this.configService = new ConfigService();
    this.programsSeedFilePath =
    this.configService.get<string>('SEED_FILES_PATH') + this.fileName;
  }
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Doctor);
    const programs = await this.storageService.getFile(
      this.programsSeedFilePath,
    );
    await repository.insert(programs);
  }
}
