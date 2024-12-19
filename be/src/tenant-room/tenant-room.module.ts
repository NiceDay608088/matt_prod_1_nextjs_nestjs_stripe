import { Module } from '@nestjs/common';
import { TenantRoomService } from './tenant-room.service';
import { TenantRoomResolver } from './tenant-room.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { tenantProfileProvider } from 'src/database/providers/tenant-profile.provider';
import { tenantRoomProvider } from 'src/database/providers/tenant-room.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    TenantRoomService,
    TenantRoomResolver,
    ...tenantProfileProvider,
    ...tenantRoomProvider,
  ],
})
export class TenantRoomModule {}
