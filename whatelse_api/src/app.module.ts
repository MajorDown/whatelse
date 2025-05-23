import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { ContributionModule } from './contribution/contribution.module';

@Module({
  imports: [UserModule, ProjectModule, TaskModule, ContributionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
