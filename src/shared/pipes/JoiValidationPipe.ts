import { PipeTransform, Injectable, ArgumentMetadata, HttpException, BadRequestException } from '@nestjs/common';
import {Schema} from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor( private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {

    if(metadata.type !== 'body') {
      return value;
    }
    const { error } = this.schema.validate(value);

    if (error) {
        console.error(`Joi validation Failed ${error}`);

        throw new HttpException({
            success: false,
            field: error.details[0].context.key,
            message: error.details[0].message,
          }, 400);

    }
    console.info(`Joi validation Passed!`);
    return value;
  }
}