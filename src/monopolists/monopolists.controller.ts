import { Controller, UseGuards, Param, BadRequestException, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTokenUser } from 'src/auth/get-token-user.decorator';
import { Role } from 'src/auth/enums/roles';
import { MonopolistsService } from './monopolists.service';
import { Period } from './enums/period.enum';

@Controller('monopolists')
export class MonopolistsController {

  allowedPeriods = [Period.MONTH, Period.YEAR, Period.EVER];

  constructor(private monopolistService: MonopolistsService) {
  }
  @Get('/:period')
  @UseGuards(AuthGuard())
  async listMonopolists(@GetTokenUser() user, @Param('period') period ) {
    console.log({user});
    // there should be a seperate access-control Module
    // instead of " == Role.ADMIN " but its just for the sake of time.
    if (user
      && user.role === Role.ADMIN
      && this.allowedPeriods.includes(period)) {
      let monopolist = await this.monopolistService.listMonopolists(period);
      return monopolist;
    } else {
      throw new BadRequestException();
    }
    
  }
  
}
