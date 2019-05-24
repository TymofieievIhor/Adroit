"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_1 = require("./file.service");
const common_1 = require("@nestjs/common");
let FileUtils = class FileUtils {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async modifyFileLink(fileIds, fileOwner, accountId, manager) {
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
};
FileUtils = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileUtils);
exports.FileUtils = FileUtils;
//# sourceMappingURL=fileUtils.js.map