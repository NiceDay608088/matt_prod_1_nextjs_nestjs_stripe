import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { StripeRentFeeResponse } from './payment.dto';
import { RentalPropertyService } from 'src/rental-property/rental-property.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private rentalPropertyService: RentalPropertyService,
  ) {
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
    // console.log(r);

    return r;
  };

  async createStripePaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    // 1/3 paymentIntent.id
    return await this.stripe.paymentIntents.create({
      amount: amount * 100,
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
      case 'payment_intent.created':
        const pic = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent was created  ${pic.id}`);
        break;
      case 'payment_intent.succeeded':
        const pis = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent was successful  ${pis.id}`);
        break;
      case 'payment_intent.payment_failed':
        const pif = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent was failed ${pif.id}`);
        break;
      case 'charge.succeeded':
        const cs = event.data.object as Stripe.Charge;
        const cspii = cs.payment_intent as String;
        console.log(`Charge was succeed ${cspii}`);
        break;
      case 'charge.updated':
        const cu = event.data.object as Stripe.Charge;
        const cupii = cu.payment_intent as String;
        console.log(`Charge was updated ${cupii}`);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  /**
   * https://stripe.com/pricing
   *
   */
  async getRentFee(
    rentalPropertyId: string,
    cardType: string,
  ): Promise<StripeRentFeeResponse> {
    const rentalProperty =
      await this.rentalPropertyService.getRentalProperty(rentalPropertyId);

    switch (cardType.toLowerCase()) {
      case 'visa':
        return {
          price: rentalProperty.price,
          fee: '0.5%',
          total: rentalProperty.price * (1 + 0.5 / 100),
          description: '+ 0.5% for manually entered cards',
        };
      default:
        return {
          price: -1,
          fee: '-1',
          total: -1,
          description: `Bank Type: ${cardType} is not supported`,
        };
    }
  }
}
