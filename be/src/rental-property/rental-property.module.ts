import { Module } from '@nestjs/common';
import { RentalPropertyService } from './rental-property.service';
import { RentalPropertyResolver } from './rental-property.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { rentalPropertyProvider } from 'src/database/providers/rental-property.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    RentalPropertyService,
    RentalPropertyResolver,
    ...rentalPropertyProvider,
  ],
  exports: [RentalPropertyService],
})
export class RentalPropertyModule {}
