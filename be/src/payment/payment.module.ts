import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentResolver, PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
