import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthenticatedUser } from '../common/decorators/user.decorator';

@Controller('challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @Roles('manager')
  async getAll(@AuthenticatedUser() user: any) {
    console.log('Authenticated User:', user);
    return this.challengesService.getAll();
  }

  @Get(':id')
  @Roles('manager')
  async getById(@Param('id') id: string, @AuthenticatedUser() user: any) {
    console.log('Authenticated User:', user);
    return this.challengesService.getById(id);
  }

  @Post()
  @Roles('manager')
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
    @AuthenticatedUser() user: any,
  ) {
    console.log('Authenticated User:', user);
    return this.challengesService.create(createChallengeDto);
  }

  @Put(':id')
  @Roles('manager')
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @AuthenticatedUser() user: any,
  ) {
    console.log('Authenticated User:', user);
    return this.challengesService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @Roles('manager')
  async delete(@Param('id') id: string, @AuthenticatedUser() user: any) {
    console.log('Authenticated User:', user);
    return this.challengesService.delete(id);
  }
}
