import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { TripsModule } from './trips/trips.module';
import { MonopolistsModule } from './monopolists/monopolists.module';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || config.get('SERVER.MONGODB_URI'),
    { 
      useNewUrlParser: true,
      autoIndex: true,
      useUnifiedTopology: true ,
      connectionFactory: (connection) => {return connection}
    }
    ),
    WinstonModule.forRoot({
      // options
      format: format.combine(
        format.timestamp({
          format: config.get('WINSTON.FORMAT')
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      transports: [
        // printing logger in the console with date-time stamp
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.colorize(),
            nestWinstonModuleUtilities.format.nestLike()
          )
        }),
        // logging in a daily file with date stamp
        new DailyRotateFile({
          filename: config.get('WINSTON.FILE_PATH'),
          datePattern: config.get('WINSTON.DATE_PATTERN'),
          zippedArchive: true,
          maxSize: config.get('WINSTON.MAX_SIZE'),
          maxFiles: config.get('WINSTON.MAX_FILES')
        })
      ]
    }),
    TripsModule,
    MonopolistsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
