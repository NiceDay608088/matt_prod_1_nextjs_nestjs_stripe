import mongoose from 'mongoose';
import { CurrencyUnitEnum } from 'src/enums/currency-unit';
import { StripeCardEnum } from 'src/enums/stripe-card-enum';

export const TenantRoomSchema = new mongoose.Schema({
  cardType: StripeCardEnum,
  price: Number,
  fee: Number,
  total: Number,
  currentUnit: CurrencyUnitEnum,
  rentalPropertyId: String,
});
