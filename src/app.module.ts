import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

import { RideRequestModule } from './ride-request/ride-request.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    UserModule,
    AuthModule,
    RideRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
