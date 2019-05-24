import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVehicleInsuranceDto {
  @ApiModelProperty({example: 'Insurance company 1'})
  @IsString()
  insurance_company_name: string;

  @ApiModelProperty({example: 123})
  @IsNumber()
  policy_number: number;

  @ApiModelProperty({example: new Date()})
  @IsString()
  effective_date: string;

  @ApiModelProperty({example: new Date()})
  @IsString()
  expiration_date: string;
}