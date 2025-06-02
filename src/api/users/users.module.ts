import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserByIdPipe } from '../../common/pipes/user-id.pipe';
import { UserCreatePipe } from '../../common/pipes/user-create.pipe';
import { UsersMapperModule } from './mapper/users-mapper.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserByIdPipe, UserCreatePipe],
  exports: [UsersService, UserByIdPipe, UserCreatePipe],
  imports: [forwardRef(() => UsersMapperModule)],
})
export class UsersModule {}
