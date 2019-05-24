import { CreateServiceContractSimpleDto } from './create-service-contract-simple.dto';
import { CreateServiceContractPricingSimpleDto } from './create-service-contract-pricing-simple.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateServiceContractDto {
  @ApiModelProperty({required: true, type: CreateServiceContractSimpleDto})
  contract: CreateServiceContractSimpleDto;

  @ApiModelProperty({required: true, type: CreateServiceContractPricingSimpleDto})
  pricing: CreateServiceContractPricingSimpleDto;

  client_id?: number;
}
