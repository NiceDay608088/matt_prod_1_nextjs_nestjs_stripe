import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentIntentDto {
  @Field()
  amount: number;
  @Field()
  currency: string;
}

@ObjectType()
export class StripePaymentIntentDto {
  @Field()
  clientSecret: string;
}

@InputType()
export class StripQueryeRentFeeRequest {
  @Field()
  rentalPropertyId: string;
  @Field()
  cardType: string;
}

@ObjectType()
export class StripeRentFeeResponse {
  @Field()
  price: number;
  @Field()
  fee: string;
  @Field()
  total: number;
  @Field()
  description: string;
}
