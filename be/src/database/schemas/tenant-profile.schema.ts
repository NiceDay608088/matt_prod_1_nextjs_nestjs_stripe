import mongoose from 'mongoose';
import { GenderEnum } from 'src/enums/gender-enum';

export const TenantPorfileSchema = new mongoose.Schema({
  tenant_room_id: String,
  firstName: String,
  lastName: String,
  passportId: String,
  age: Number,
  gender: {
    type: String,
    enum: Object.values(GenderEnum),
    required: true,
  },
  isPrimary: Boolean,
});
