import mongoose from 'mongoose';
import { RentalPropertyEnum } from 'src/enums/rental-property-enum';

export const RentalPropertySchema = new mongoose.Schema({
  name: String,
  type: RentalPropertyEnum,
  price: Number,
  location: String,
  image: String, // storage path
});
