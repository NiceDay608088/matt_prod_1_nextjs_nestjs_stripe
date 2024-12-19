import mongoose from 'mongoose';
import { CurrencyUnitEnum } from 'src/enums/currency-unit';
import { StripeCardEnum } from 'src/enums/stripe-card-enum';

export const TenantRoomSchema = new mongoose.Schema({
  cardType: {
    type: Number,
    enum: Object.values(StripeCardEnum),
    required: true,
  },
  price: Number,
  fee: Number,
  total: Number,
  currentUnit: {
    type: String,
    enum: Object.values(CurrencyUnitEnum),
    required: true,
  },
  rentalPropertyId: String,
});
