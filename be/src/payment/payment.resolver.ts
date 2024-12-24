import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { CreatePaymentIntentDto, StripePaymentIntentDto } from './payment.dto';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  /*
  --- schema ---
  mutation CreatePaymentIntent($createPaymentIntentDto: CreatePaymentIntentDto!) {
    createPaymentIntent(createPaymentIntentDto: $createPaymentIntentDto) {
      clientSecret
    }
  }

  --- query ---
  {
	  "createPaymentIntentDto": {
		  "amount": 1000,
		  "currency": "usd"
	  }
  }
  */
  @Mutation(() => StripePaymentIntentDto)
  async createPaymentIntent(
    @Args('createPaymentIntentDto')
    createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    const { amount, currency } = createPaymentIntentDto;
    const paymentIntent = await this.paymentService.createStripePaymentIntent(
      amount,
      currency,
    );
    console.log('.....................paymentIntent...', { paymentIntent }); // paymentIntent.id
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
