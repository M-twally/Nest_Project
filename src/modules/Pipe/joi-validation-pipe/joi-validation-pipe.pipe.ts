import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidationPipePipe implements PipeTransform {
  constructor(private schema:Object){}
  transform(value: any, metadata: ArgumentMetadata) {

    if (this.schema[metadata.type]) {

      const { error } = this.schema[metadata.type].validate(value,{abortEarly:true});
      if (error) {
        throw new BadRequestException(error.details);
      }
      
    }
    return value;
  }
}
