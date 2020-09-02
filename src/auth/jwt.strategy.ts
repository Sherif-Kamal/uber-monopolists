
import { PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT.SECRET'),
        })
    }


    async validate(payload: any) {
        return payload;
    }
}