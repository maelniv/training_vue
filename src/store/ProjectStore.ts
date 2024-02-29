import { defineStore } from "pinia";
import { ProjectsListType } from "@/type/project/ProjectsListType.js";
import fetchProject from "@/api/fetchProject";

interface ProjectType {
  projectList: ProjectsListType;
}

export const useProjectStore = defineStore("project", {
  state: (): ProjectType => {
    return {
        projectList: {} as ProjectsListType,
    };
  },
  persist: true,
  actions: {
    async fetchProjectList(siteId: string) {
      try {
        this.projectList = await fetchProject(siteId);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
