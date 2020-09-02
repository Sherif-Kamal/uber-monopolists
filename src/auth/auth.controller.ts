import { Controller, Post, Inject, Body, UsePipes, Res, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from 'winston';
import { AuthCredentialDto } from './dto/user-cred.dto';
import { JoiValidationPipe } from 'src/shared/pipes/JoiValidationPipe';
import { authCredentialSchema } from './joi-validation-schemas/auth-credential.schema';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService
  ) { }
  
  @Post('register')
  @UsePipes(new JoiValidationPipe(authCredentialSchema))
  async register(@Body() authCredentialDto: AuthCredentialDto, @Res() res) {

    try {
      const token = await this.authService.createUser(authCredentialDto); 
       if(token) {
        return res.status(201).json({
          token
        })   
      }
      
    } catch (e) {
      // email unique validator error
      if (e.errors.email.properties.message) {
        return res.status(400).json({
          message: e.errors.email.properties.message || 'Bad request'
        })
      }
      throw new InternalServerErrorException();
    }
  }
  
  @Post('login')
  @UsePipes(new JoiValidationPipe(authCredentialSchema))
  async login(@Body() authCredentialDto: AuthCredentialDto, @Res() res) {

    try {
      let token = await this.authService.login(authCredentialDto);
      if(token) {
        res.status(200).header('x-auth', token).json({
              success: true,
              message: 'Logged in'
            }); 
      }
    } catch (e) {
      res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }

  }

}
