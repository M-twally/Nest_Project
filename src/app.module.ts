import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/User/user.module';
import { WalletModule } from './modules/Wallet/wallet.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest_1'),AuthModule,UserModule,WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
