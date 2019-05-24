import { UpdateServiceContractPricingDto } from './update-service-contract-pricing.dto';
import { UpdateServiceContractSimpleDto } from './update-service-contract-simple.dto';

export class UpdateServiceContractDto {
  contract?: UpdateServiceContractSimpleDto;
  pricing?: UpdateServiceContractPricingDto;
  client_id?: number;
}