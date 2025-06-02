import { Module } from '@nestjs/common';
import { UsersProfile } from './users.profile';

@Module({
  providers: [UsersProfile],
  exports: [UsersProfile],
})
export class UsersMapperModule {}
