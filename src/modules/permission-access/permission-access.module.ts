import { Module } from '@nestjs/common';
import { PermissionAccessController } from './permission-access.controller';
import { PermissionAccessService } from './permission-access.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionAccess } from './permission-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionAccess])],
  controllers: [PermissionAccessController],
  providers: [PermissionAccessService],
  exports: [PermissionAccessService],
})
export class PermissionAccessModule {}
