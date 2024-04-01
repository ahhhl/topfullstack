import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: User,
})
@Controller('users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}
  @Get('option')
  option() {
    return {
      title: '用户管理',
      column: [
        { label: '用户', prop: 'username' },
        { label: '用户密码', prop: 'password' },
      ],
    };
  }
}
