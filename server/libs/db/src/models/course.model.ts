import { ApiProperty } from '@nestjs/swagger';
import { Ref, arrayProp, modelOptions, prop } from '@typegoose/typegoose';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  @arrayProp({ ref: 'Episode' })
  episodes: Ref<Episode>[];
}
