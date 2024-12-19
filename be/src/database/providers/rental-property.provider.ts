import { Connection } from 'mongoose';
import { RentalPropertySchema } from '../schemas/rental-property.schema';

export const rentalPropertyProvider = [
  {
    provide: 'RENTAL_PROPERTY_MODEL',
    useFactory: (connection: Connection) =>
      // model name used internally,
      // schema object,
      // collection name in mongodb,
      connection.model(
        'RentalProperty',
        RentalPropertySchema,
        'rental_properties',
      ),
    inject: ['DATABASE_CONNECTION'],
  },
];
