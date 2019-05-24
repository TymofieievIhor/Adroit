import { Controller, Patch, Post, Req, Body, Param, Get, Res, Delete, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { ControllerBase } from '../../common/helpers/controller.base';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiUseTags('file')
@Controller('/private/file')
export class FileController extends ControllerBase<File> {
  constructor(protected service: FileService) {
    super(service, {create: CreateFileDto});
  }

  @Post()
  @ApiOperation({title: 'Upload the file'})
  async create({}, @Req() req): Promise<File> {
    return await this.service.upload(req);
  }

  @Patch('/:id')
  @ApiOperation({title: 'Update the file by id'})
  async updateById(@Param('id') id: number, @Body() body: UpdateFileDto): Promise<File> {
    return await super.updateById(id, body);
  }

  @Get('/download/:id')
  @ApiOperation({title: 'Download the file by id'})
  async download(@Param('id') id: number, @Res() res) {
    return await this.service.download(id, res);
  }

  @Delete('/:id')
  @ApiOperation({title: 'Delete the file by id'})
async deleteById(@Param('id') id: number, @Query('accountId') accountId?: number): Promise<void> {
    return await this.service.deleteById(id, accountId);
  }
}
