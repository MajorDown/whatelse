import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { AuthGuard } from '@/src/middleware/auth.guard';
import { RoleGuard } from '@/src/middleware/role.guard';

@Controller('contribution')
@UseGuards(AuthGuard)
export class ContributionController {
  constructor(private readonly service: ContributionService) {}

  @Post()
  @UseGuards(RoleGuard(['creator']))
  add(@Body() body: { userId: string; projectId: string }): Promise<boolean> {
    return this.service.add(body.userId, body.projectId);
  }

  @Delete()
  @UseGuards(RoleGuard(['creator', 'contributor']))
  remove(@Body() body: { userId: string; projectId: string }): Promise<boolean> {
    return this.service.remove(body.userId, body.projectId);
  }

  @Get('byUser/:id')
  @UseGuards(RoleGuard(['creator', 'contributor']))
  getByUser(@Param('id') userId: string) {
    return this.service.getByUser(userId);
  }

  @Get('byProject/:id')
  @UseGuards(RoleGuard(['creator', 'contributor']))
  getByProject(@Param('id') projectId: string) {
    return this.service.getByProject(projectId);
  }
}
