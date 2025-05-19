import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import createProject from '@/src/db/project/createProject';
import { CreateProjectInput, Project } from '@/src/db/project/project.types';
import getProjectsByCreator from '@/src/db/project/getProjectsByCreator';
import deleteProjectById from '@/src/db/project/deleteProjectById';
import updateProjectById from '@/src/db/project/updateProjectById';
import getProjectsByContribution from '@/src/db/project/getProjectsByContribution';

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

    async deleteById(id: string): Promise<boolean> {
        return deleteProjectById(id);
    }

    async updateById(projectId: string, updatedData: Partial<CreateProjectDto>): Promise<Project | null> {
        return updateProjectById(projectId, updatedData);
    }

    async getByContribution(userId: string): Promise<Project[]> {
        return getProjectsByContribution(userId);
    }
}
