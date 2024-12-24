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
