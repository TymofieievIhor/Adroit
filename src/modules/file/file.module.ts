import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverFile } from './entities/driver-file.entity';
import { PartnerFile } from './entities/partner-file.entity';
import { ClientFile } from './entities/client-file.entity';
import { FileUtils } from './fileUtils';

@Module({
  imports: [TypeOrmModule.forFeature([File, DriverFile, PartnerFile, ClientFile])],
  controllers: [FileController],
  providers: [FileService, FileUtils],
  exports: [FileService, FileUtils],
})
export class FileModule {}
