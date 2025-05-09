import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/nest',
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Use a secure secret in production
      signOptions: { expiresIn: '1h' },
    }),
    ChallengesModule,
  ],
})
export class AppModule {}

