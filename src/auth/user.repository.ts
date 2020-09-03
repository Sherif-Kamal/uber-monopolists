import { InjectModel } from "@nestjs/mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { Logger } from 'winston';
import { Model } from "mongoose";
import { User } from "./interfaces/user";
import { AuthCredentialDto } from "./dto/user-cred.dto";

@Injectable()
export class UserRepoistory {
  
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectModel('User') private userModel: Model<User>,
    @Inject('seedUsers') private users: any,
    ) {
    }
    
  createUser(authCredentialDto: AuthCredentialDto) {
    let user = new this.userModel(authCredentialDto);
    
    return user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        return token;
      })
      .catch((e) => {
        console.log(e);
        this.logger.error(`Error generating auth token for user: ${user}`);
        return Promise.reject(e);
      })
      
    }
    
  login(authCredentialDto: AuthCredentialDto) {
    const { email, password } = authCredentialDto;
        return this.userModel.findByCredentials(email,password).then((user) => {
          return user.generateAuthToken()
            .then((token) => {
            return token;
          });
        })
  }
  
  async seedUsers() {
    await this.userModel.deleteMany({}); 
    return this.userModel.insertMany(this.users);
  }

}