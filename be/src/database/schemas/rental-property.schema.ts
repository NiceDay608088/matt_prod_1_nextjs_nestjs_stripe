import mongoose, { Schema } from 'mongoose';
import { RentalPropertyEnum } from 'src/enums/rental-property-enum';

export const RentalPropertySchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: Object.values(RentalPropertyEnum),
    required: true,
  },
  price: { type: Schema.Types.Double },
  address: String,
  imageUrl: String, // storage path
});
