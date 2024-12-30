import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import {
  CreatePaymentIntentDto,
  StripePaymentIntentDto,
  StripeRentFeeResponse,
  StripQueryeRentFeeRequest,
} from './payment.dto';
import { sleep } from 'src/utils/common';

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

  @Query(() => StripeRentFeeResponse)
  async getRentFee(
    @Args('stripQueryeRentFeeRequest')
    stripQueryeRentFeeRequest: StripQueryeRentFeeRequest,
  ): Promise<StripeRentFeeResponse> {
    const r = await this.paymentService.getRentFee(
      stripQueryeRentFeeRequest.rentalPropertyId,
      stripQueryeRentFeeRequest.cardType,
    );
    console.log('getRentFee', r);

    await sleep(1000);

    return r;
  }
}
