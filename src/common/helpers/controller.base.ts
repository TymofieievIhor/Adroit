import { ServiceBase } from './service.base';
import { BadRequestException, Body, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiImplicitBody, ApiImplicitParam } from '@nestjs/swagger';
import { validate, ValidationError } from 'class-validator';
import { IdDto } from './id.dto';
import { IDtoMap } from './interfaces/dtoMap.interface';
import { BasicPaginationDto } from './basic-pagination.dto';
import { ACCOUNT_ID_HEADER, BASE_PAGINATION_PROPS } from './constant';
import { IResponseWithPagination } from './interfaces/reponseWithPagination.interface';

export abstract class ControllerBase<T> {
    protected constructor(protected service: ServiceBase<T>, protected dto: IDtoMap) {
    }

    @Post()
    @ApiOperation({ title: 'Create a new item' })
    @ApiImplicitBody({
        name: 'body',
        type: Object,
    })
    async create(@Body() body, @Req() req?: any): Promise<T> {
        await this.validateDto(new this.dto.create(), body);
        return await this.service.create(body);
    }

    @Get()
    @ApiOperation({ title: 'Get all items' })
    async find(@Query() params?: any, @Query() pagination?: BasicPaginationDto): Promise<IResponseWithPagination<T> | any> {
        params = Object.assign({}, params);
        pagination = Object.assign({}, pagination);
        for (const key of Object.keys(params)) {
            if (BASE_PAGINATION_PROPS.includes(key)) {
                delete params[key];
            }
        }
        return await this.service.find(params || {}, pagination);
    }

    @Get('/:id')
    @ApiOperation({ title: 'Find an item by id' })
    @ApiImplicitParam({
        name: 'id',
        type: Number,
    })
    async findById(@Param('id') id: number): Promise<T> {
        await this.validateId(id);
        return await this.service.findById(id);
    }

    @Patch('/:id')
    @ApiOperation({ title: 'Update an item by id' })
    @ApiImplicitParam({
        name: 'id',
        type: Number,
    })
    @ApiImplicitBody({
        name: 'body',
        type: Object,
    })
    async updateById(@Param('id') id: number, @Body() body: any): Promise<T> {
        await this.validateId(id);
        return await this.service.updateById(id, body);
    }

    @Delete('/:id')
    @ApiOperation({ title: 'Delete an item by id' })
    @ApiImplicitParam({
        name: 'id',
        type: Number,
    })
    async deleteById(@Param('id') id: number, @Req() req?: any): Promise<void> {
        const accountId = req.headers[ACCOUNT_ID_HEADER];
        return await this.service.deleteById(id, accountId);
    }

    private errorHandler(errors: ValidationError[]) {
        const msg = errors.map(err => `(${typeof err.value}) '${err.value}' : ${Object.values(err.constraints).join(', ')}`).join(';\n');
        throw new BadRequestException(msg); // TODO: create error handling (pipe, filter)
    }

    async validateId(id) {
        const errors = await validate(Object.assign(new IdDto(), { id }));
        if (errors.length) {
            this.errorHandler(errors);
        }
    }

    private async validateDto(dto, body) {
        const dtoInstance = Object.assign(dto, body);
        const errors = await validate(dtoInstance);
        if (errors.length) {
            this.errorHandler(errors);
        }
    }
}
