import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { Challenge, ChallengeSchema } from './schemas/challenge.schema';
import { Manager, ManagerSchema } from './schemas/manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Manager.name, schema: ManagerSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
