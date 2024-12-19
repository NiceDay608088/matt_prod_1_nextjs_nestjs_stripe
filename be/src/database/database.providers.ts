import { Connection } from 'mongoose';
import { RentalPropertySchema } from './schemas/rental-property-schema';
import { TenantPorfileSchema } from './schemas/tenant-profile-schema';
import { TenantRoomSchema } from './schemas/tenant-room-schema';

export const databaseProviders = [
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
  {
    provide: 'TENANT_PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      // model name used internally,
      // schema object,
      // collection name in mongodb,
      connection.model('TenantProfile', TenantPorfileSchema, 'tenant_profiles'),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TENANT_ROOM_MODEL',
    useFactory: (connection: Connection) =>
      // model name used internally,
      // schema object,
      // collection name in mongodb,
      connection.model('TenantRoom', TenantRoomSchema, 'tenant_rooms'),
    inject: ['DATABASE_CONNECTION'],
  },
];
