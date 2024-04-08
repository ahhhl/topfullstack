import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}
  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      column: [
        {
          label: '所属课程',
          prop: 'course',
          type: 'select',
          dicData: courses,
          span: 24,
          row: true,
        },
        { label: '课时名称', prop: 'name', span: 24 },
        {
          label: '视频文件',
          prop: 'file',
          span: 24,
          listType: 'picture-img',
          type: 'upload',
          action: 'upload',
        },
      ],
    };
  }
}
