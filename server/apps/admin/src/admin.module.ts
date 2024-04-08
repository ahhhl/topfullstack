import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          // storage表示上传文件的存储方式
          storage: MAO({
            config: {
              region: process.env.REGION,
              accessKeyId: process.env.ACCESS_KEY_ID,
              accessKeySecret: process.env.ACCESS_KEY_SECRET,
              bucket: process.env.BUCKET,
            },
            // to set path prefix for files, could be string or function
            // destination: '',
          }),
          // dest 表示上传文件的保存路径 本地
          // dest: './uploads'
        };
      },
    }),
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
