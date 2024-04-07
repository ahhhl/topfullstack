import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    MulterModule.register({
      // storage表示上传文件的存储方式
      storage: MAO({
        config: {
          region: '<region>',
          accessKeyId: '<accessKeyId>',
          accessKeySecret: '<accessKeySecret>',
          bucket: '<bucket>',
        },
        // to set path prefix for files, could be string or function
        // destination: '',
      }),
      // dest 表示上传文件的保存路径 本地
      // dest: './uploads'
    }),
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
