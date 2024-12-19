import { Field, ObjectType } from '@nestjs/graphql';
import { RentalPropertyEnum } from 'src/enums/rental-property-enum';

@ObjectType()
export class RentalPropertyDto {
  @Field(() => String)
  id: string;
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  type: RentalPropertyEnum;
  @Field()
  address: string;
  @Field()
  imageUrl: String; // storage path
}
