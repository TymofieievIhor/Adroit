import { ControllerBase } from '../../common/helpers/controller.base';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { UpdateFileDto } from './dto/update-file.dto';
export declare class FileController extends ControllerBase<File> {
    protected service: FileService;
    constructor(service: FileService);
    create({}: {}, req: any): Promise<File>;
    updateById(id: number, body: UpdateFileDto): Promise<File>;
    download(id: number, res: any): Promise<void>;
    deleteById(id: number, accountId?: number): Promise<void>;
}
