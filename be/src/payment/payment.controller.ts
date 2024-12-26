import { Controller, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhooks/stripe')
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    console.log('...here...');
    try {
      await this.paymentService.handleStripeWebhook(req);
      res.status(200).send('Received');
    } catch (error) {
      console.error('Webhook handling error:', error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}
