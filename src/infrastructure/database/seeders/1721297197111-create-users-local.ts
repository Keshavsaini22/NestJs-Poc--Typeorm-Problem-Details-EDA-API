import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StorageFileHandlerService } from 'src/infrastructure/storage/file-storage-service';
import { ConfigService } from '@nestjs/config';
import { DriveConfigurationService } from 'src/infrastructure/storage/drive-config';
import { User } from 'src/domain/user/user.entity';

export default class ProgramSeeder implements Seeder {
  private storageService: StorageFileHandlerService;
  private configService: ConfigService;
  private programsSeedFilePath: string;
  private fileName: string = 'users.json';
  constructor() {
    this.storageService = new StorageFileHandlerService(
      new ConfigService(),
      new DriveConfigurationService(),
    );
    this.configService = new ConfigService();
    this.programsSeedFilePath =
    this.configService.get<string>('SEED_FILES_PATH') + this.fileName;
    console.log('programsSeedFilePath: ', this.programsSeedFilePath);
  }
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    const programs = await this.storageService.getFile(
      this.programsSeedFilePath,
    );
    await repository.insert(programs);
  }
}
