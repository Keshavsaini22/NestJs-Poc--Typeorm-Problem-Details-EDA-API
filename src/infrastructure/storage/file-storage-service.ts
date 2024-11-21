import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DriveConfigurationService } from './drive-config';

@Injectable()
export class StorageFileHandlerService {
  private driveManager;
  private storageType: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly driveConfigService: DriveConfigurationService,
  ) {
    this.driveManager = this.driveConfigService.getDriveManager();
    this.storageType = this.configService.get<string>('FILESYSTEM_DISK');
  }

  public async getFile(fileName: string): Promise<any> {
    console.log('fileName: ', fileName);
    const drive = this.driveManager.disk(this.storageType);
    const fileContent = await drive.get(fileName);
    return JSON.parse(fileContent.raw.toString());
  }
}
