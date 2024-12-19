import { Connection } from 'mongoose';
import { TenantRoomSchema } from '../schemas/tenant-room.schema';

export const tenantRoomProvider = [
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
