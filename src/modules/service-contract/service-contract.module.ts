import { Module } from '@nestjs/common';
import { ServiceContractService } from './service-contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceContract } from './entities/service-contract.entity';
import { ServiceContractPricing } from './entities/service-contract-pricing.entity';
import { ServiceContractStatus } from './entities/service-contract-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceContract, ServiceContractPricing, ServiceContractStatus])],
  providers: [ServiceContractService],
  exports: [ServiceContractService],
})
export class ServiceContractModule {}
