
const jwt = require('jsonwebtoken');
import * as config from 'config';

const JWT_SECRET = process.env.PORT || config.get('JWT.SECRET');

export const users = [
  {
    email: "sherif@develop.com",
    password: "$2a$10$qJjqthFD5bAC//EqoQgzNuqUYuZj7sZFgPDAHw4BaEM0H4eKMr3aa",
    token: jwt.sign(
      {
        role: "admin",
      }, JWT_SECRET).toString(),
    role: "admin"
  }
]