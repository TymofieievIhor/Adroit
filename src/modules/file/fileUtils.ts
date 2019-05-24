import { FileService } from './file.service';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUtils {
  constructor(private fileService: FileService) {
  }

  async modifyFileLink(fileIds: number[], fileOwner: {name: string, id: number}, accountId?: number, manager?: EntityManager): Promise<void> {
    const existingFileIds = (await this.fileService.findFilesByOwner(fileOwner.id, fileOwner.name)).items.map((file) => file.id);
    if (existingFileIds && existingFileIds.length) {
      for (let i = 0; i < existingFileIds.length; i++) {
        for (let j = 0; j < fileIds.length; j++) {
          if (+fileIds[j] === +existingFileIds[i]) {
            fileIds.splice(j, 1);
            existingFileIds.splice(i, 1);
            j--;
            i--;
          }
        }
      }
    }
    if (existingFileIds && existingFileIds.length) {
      const deletePromises = [];
      for (const id of existingFileIds) {
        deletePromises.push(this.fileService.deleteById(id, accountId));
      }
      await Promise.all(deletePromises);
    }
    if (fileIds && fileIds.length) {
      const addPromises = [];
      for (const id of fileIds) {
        const params = {
          file_id: id,
        };
        params[`${fileOwner.name}_id`] = fileOwner.id;
        addPromises.push(this.fileService.createLink(params, manager));
      }
      await Promise.all(addPromises);
    }
  }
}