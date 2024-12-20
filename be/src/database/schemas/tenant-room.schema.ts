import mongoose, { Schema } from 'mongoose';
import { CurrencyUnitEnum } from 'src/enums/currency-unit';
import { StripeCardEnum } from 'src/enums/stripe-card-enum';

export const TenantRoomSchema = new mongoose.Schema({
  cardType: {
    type: Number,
    enum: Object.values(StripeCardEnum),
    required: true,
  },
  price: { type: Schema.Types.Double },
  fee: { type: Schema.Types.Double },
  total: { type: Schema.Types.Double },
  currentUnit: {
    type: String,
    enum: Object.values(CurrencyUnitEnum),
    required: true,
  },
  rentalPropertyId: String,
});
