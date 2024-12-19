import mongoose from 'mongoose';
import { GenderEnum } from 'src/enums/gender-enum';
import { StripeCardEnum } from 'src/enums/stripe-card-enum';

export const TenantPorfileSchema = new mongoose.Schema({
  tenant_id: String,
  firstName: String,
  lastName: String,
  passportId: String,
  age: Number,
  gender: GenderEnum,
  isPrimary: Boolean,
  cardType: StripeCardEnum,
});
