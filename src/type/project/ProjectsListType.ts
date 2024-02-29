import { ProjectType } from "./ProjectType";

export type ProjectsListType = {
    pagination: {
        pageNumber: string;
        pageSize: string;
        totalAvailable: string;
    };
    projects: {
        project: ProjectType[];
    };
}
