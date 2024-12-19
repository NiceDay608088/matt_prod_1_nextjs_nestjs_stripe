import { Connection } from 'mongoose';
import { TenantPorfileSchema } from '../schemas/tenant-profile.schema';

export const tenantProfileProvider = [
  {
    provide: 'TENANT_PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      // model name used internally,
      // schema object,
      // collection name in mongodb,
      connection.model('TenantProfile', TenantPorfileSchema, 'tenant_profiles'),
    inject: ['DATABASE_CONNECTION'],
  },
];
