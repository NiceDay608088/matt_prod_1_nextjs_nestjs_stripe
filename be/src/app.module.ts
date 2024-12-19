import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { TenantRoomModule } from './tenant-room/tenant-room.module';
import { RentalPropertyModule } from './rental-property/rental-property.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    DatabaseModule,
    PaymentModule,
    TenantRoomModule,
    RentalPropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
