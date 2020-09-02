import { Controller, Post, UseGuards, Res, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GetTokenUser} from '../auth/get-token-user.decorator';
import { TripsService } from './trips.service';
import { Role } from 'src/auth/enums/roles';

@Controller('trips')
export class TripsController {
  
  constructor(private tripService: TripsService) {
  }
  
  @Post()
  @UseGuards(AuthGuard())
  async createTrip(@GetTokenUser() user) {
    // there should be a seperate access-control Module
    // instead of " == Role.DRIVER " but its just for the sake of time.
    if (user && user.role !== Role.DRIVER) {
      throw new UnauthorizedException();
    }
    if (user && user._id && user.role === Role.DRIVER) {
      let trip = await this.tripService.createTrip(user._id);
      return trip;
    } else {
      throw new BadRequestException();
    }
    
  }
}
