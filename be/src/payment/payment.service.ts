import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request, Response } from 'express';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.getEnv().stripeSecretKey);
  }

  getEnv = () => {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    const stripeSigningSecret = this.configService.get<string>(
      'STRIPE_SIGNING_SECRET',
    );

    if (!stripeSecretKey) {
      throw new Error(
        'Stripe secret key is not set in the environment variables.',
      );
    }

    if (!stripeSigningSecret) {
      throw new Error(
        'Stripe signing secret key is not set in the environment variables.',
      );
    }

    const r = { stripeSecretKey, stripeSigningSecret };
    console.log(r);

    return r;
  };

  async createStripePaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    // 1/3 paymentIntent.id
    return await this.stripe.paymentIntents.create({
      amount,
      currency, // 'USD', 'EUR', 'GBP' ....
    });
  }

  async handleStripeWebhook(req: RawBodyRequest<Request>) {
    console.log('.....handleStripeWebhook.......');
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.getEnv().stripeSigningSecret;

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        endpointSecret,
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    // console.log({ eventType: event.type, data: event.data.object }); // 3/3 event.data.object.id is paymentIntent.id
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent was successful  ${paymentIntent.id}`);
        break;
      case 'payment_intent.payment_failed':
        const paymentFailedIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent failed ${paymentIntent.id}`);
        break;
      // Handle other event types here...
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}
