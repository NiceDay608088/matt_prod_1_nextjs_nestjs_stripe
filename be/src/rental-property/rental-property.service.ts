import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RentalPropertyEntity } from 'src/database/entities/rental-property.entity';
import { RentalPropertyDto } from './rental-property.dto';

@Injectable()
export class RentalPropertyService {
  constructor(
    @Inject('RENTAL_PROPERTY_MODEL')
    private rentalPropertyModel: Model<RentalPropertyEntity>,
  ) {}

  getRentalProperty = async (id: string): Promise<RentalPropertyDto> => {
    const rentalProperty = await this.rentalPropertyModel.findById(id).exec();
    return {
      id: rentalProperty.id,
      name: rentalProperty.name,
      price: rentalProperty.price,
      type: rentalProperty.type,
      address: rentalProperty.address,
      imageUrl: rentalProperty.imageUrl,
    };
  };
}
