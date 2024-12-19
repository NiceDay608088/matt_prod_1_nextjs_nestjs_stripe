import { Module } from '@nestjs/common';
import { RentalPropertyService } from './rental-property.service';
import { RentalPropertyResolver } from './rental-property.resolver';

@Module({
  providers: [RentalPropertyService, RentalPropertyResolver],
})
export class RentalPropertyModule {}
