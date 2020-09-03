import { Injectable, Inject } from '@nestjs/common';
import { AuthCredentialDto } from './dto/user-cred.dto';
import { UserRepoistory } from './user.repository';
import { Logger } from 'winston';

@Injectable()
export class AuthService {

  constructor(private userRepository: UserRepoistory,
    @Inject('winston') private readonly logger: Logger) {
  }

  createUser(authCredentialDto: any) {
    return this.userRepository.createUser(authCredentialDto);
  }

  login(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.login(authCredentialDto);
  }

  async onModuleInit(): Promise<void> {
    // console.log(`service module has been initialized.`);
    try {
       await this.userRepository.seedUsers();
      this.logger.info('Users Collection seeded!');
     
    } catch (e) {
      this.logger.info(`Was unable to seed Users ${e}`);
      console.log(e);
    }
    }
  
}