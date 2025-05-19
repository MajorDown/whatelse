import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import createProject from '@/src/db/project/createProject';
import { CreateProjectInput, Project } from '@/src/db/project/project.types';
import getProjectsByCreator from '@/src/db/project/getProjectByCreator';

@Injectable()
export class ProjectService {
    async create(dto: CreateProjectDto, creatorId: string): Promise<Project> {
        const input: CreateProjectInput = {
            ...dto,
            creatorId,
        };
        return createProject(input);
    }

    async getByCreator(creatorId: string): Promise<Project[]> {
        return getProjectsByCreator(creatorId);
    }
}
