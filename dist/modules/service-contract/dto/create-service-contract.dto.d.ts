import { CreateServiceContractSimpleDto } from './create-service-contract-simple.dto';
import { CreateServiceContractPricingSimpleDto } from './create-service-contract-pricing-simple.dto';
export declare class CreateServiceContractDto {
    contract: CreateServiceContractSimpleDto;
    pricing: CreateServiceContractPricingSimpleDto;
    client_id?: number;
}
