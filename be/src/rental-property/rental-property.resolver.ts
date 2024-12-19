import { Args, Query, Resolver } from '@nestjs/graphql';
import { RentalPropertyService } from './rental-property.service';
import { RentalPropertyDto } from './rental-property.dto';

@Resolver()
export class RentalPropertyResolver {
  constructor(private readonly rentalPropertyService: RentalPropertyService) {
    //
  }

  @Query(() => RentalPropertyDto)
  async getRentalProperty(@Args('id') id: string): Promise<RentalPropertyDto> {
    return await this.rentalPropertyService.getRentalProperty(id);
  }
}
