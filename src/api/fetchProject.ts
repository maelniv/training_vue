import axios from './axios.js'

import { ProjectsListType } from '@/types/project/ProjectsListType.js';

export default function fetchProject(siteId: string) : Promise<ProjectsListType> {
    return new Promise<ProjectsListType>((resolve, reject) => {
        axios.get(`/sites/${siteId}/projects`, {
        }).then(function (response: any) {
            const projectList = response.data as ProjectsListType
            resolve(projectList);
        }).catch((error: any) => {
            reject(error);
        });
    });
}