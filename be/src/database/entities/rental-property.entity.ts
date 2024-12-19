import { Document, ObjectId } from 'mongoose';
import { RentalPropertyEnum } from 'src/enums/rental-property-enum';

export interface RentalPropertyEntity extends Document {
  readonly _id: ObjectId;
  readonly name: string;
  readonly price: number;
  readonly type: RentalPropertyEnum;
  readonly address: string;
  readonly imageUrl: String; // storage path
}
