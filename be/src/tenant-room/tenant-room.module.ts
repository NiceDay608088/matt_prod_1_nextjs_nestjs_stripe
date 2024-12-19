import { Module } from '@nestjs/common';
import { TenantRoomService } from './tenant-room.service';
import { TenantRoomResolver } from './tenant-room.resolver';

@Module({
  providers: [TenantRoomService, TenantRoomResolver],
})
export class TenantRoomModule {}
