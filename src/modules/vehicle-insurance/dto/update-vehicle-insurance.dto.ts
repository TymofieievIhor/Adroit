import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleInsuranceDto {
  @ApiModelProperty({example: 'Insurance company 1'})
  @IsString()
  @IsOptional()
  insurance_company_name?: string;

  @ApiModelProperty({example: 123})
  @IsNumber()
  @IsOptional()
  policy_number?: number;

  @ApiModelProperty({example: new Date()})
  @IsString()
  @IsOptional()
  effective_date?: string;

  @ApiModelProperty({example: new Date()})
  @IsString()
  @IsOptional()
  expiration_date?: string;
}