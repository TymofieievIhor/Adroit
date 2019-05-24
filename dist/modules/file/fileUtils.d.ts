import { FileService } from './file.service';
import { EntityManager } from 'typeorm';
export declare class FileUtils {
    private fileService;
    constructor(fileService: FileService);
    modifyFileLink(fileIds: number[], fileOwner: {
        name: string;
        id: number;
    }, accountId?: number, manager?: EntityManager): Promise<void>;
}
