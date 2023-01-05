import { SchemaFactory } from '@nestjs/mongoose';
import { Type } from '@nestjs/common';
import { Schema } from 'mongoose';
import { plainToInstance } from 'class-transformer';

export function schemaFactory<T>(entity: Type<T>): Schema<T> {
  const schema = SchemaFactory.createForClass(entity);

  schema.set('toObject', {
    transform: (_, ret) => {
      const document = {
        ...ret,
        id: ret._id.toString(),
      };

      return plainToInstance(entity, document, { excludePrefixes: ['_'] });
    },
  });

  return schema;
}
