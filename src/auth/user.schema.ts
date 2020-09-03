const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
import * as config from 'config';
const _ = require('lodash');
const bcrypt = require('bcryptjs');
import { promises } from 'dns';
let uniqueValidator = require('mongoose-unique-validator');

export let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: [true, 'Email already exist'],
        index: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6
      },
      token:{
        type:String,       
    },
    role:
    { type: String ,default:"driver"}
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});



UserSchema.methods.generateHashedPassword = function(password){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      password = hash;
      return password;
    });
  });
 

}


// generating new auth token for a specific user 
UserSchema.methods.generateAuthToken = function () {
  const JWT_SECRET = process.env.PORT || config.get('JWT.SECRET');
    var user = this;
  var token = jwt.sign(
    {
      _id: user._id.toHexString(),
      role: user.role,
    }, JWT_SECRET).toString();

    user.token = token;

  return user.save()
    .then(() => {
        return token;
    }).catch((e) => {
      console.log(`here!!!!!!!!!!!!!`);
      return Promise.reject();
    })

}


//  find user by email and password if exist 
UserSchema.statics.findByCredentials = async function (email, password) {
    var User = this;

    //  var ser = await  User.findOne({email})
    return User.findOne({email}).then((user) => {
      if (!user) {
        return Promise.reject();
      }


      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });

    });
  };
  
  UserSchema.statics.findByEmail = async function(email) {
    return this.findOne({email});
  }

  // find user by token using jwt.verify
  UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
  
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      
    } catch (e) {
      return Promise.reject();
    }
  
    return User.findOne({
      '_id': decoded._id,
      'token': token,
    });
  };


//post middleware for custom error output 
UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('email must be unique'));
    } else {
      return Promise.reject();
      // next(error);
    }
  });

var User = mongoose.model('User',UserSchema);

module.exports ={User};
