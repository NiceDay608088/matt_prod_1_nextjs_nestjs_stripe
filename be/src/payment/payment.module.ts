import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [PaymentService],
})
export class PaymentModule {}
