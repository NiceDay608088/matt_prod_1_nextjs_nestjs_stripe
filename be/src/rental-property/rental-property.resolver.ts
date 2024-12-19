import { Args, Query, Resolver } from '@nestjs/graphql';
import { RentalPropertyService } from './rental-property.service';
import { RentalPropertyDto } from './rental-property.dto';

@Resolver()
export class RentalPropertyResolver {
  constructor(private readonly rentalPropertyService: RentalPropertyService) {
    //
  }

  /**
   query GetRentalProperty($id: String!) {
      getRentalProperty(id: $id) {
        id
        name
        price
        type
        address
        imageUrl
      }
    }

    {
      "id": "60c72b2f9e1b2b7c4d5a87b0"
    }
   */
  @Query(() => RentalPropertyDto, { nullable: true })
  async getRentalProperty(
    @Args('id') id: string,
  ): Promise<RentalPropertyDto | null> {
    return await this.rentalPropertyService.getRentalProperty(id);
  }
}
