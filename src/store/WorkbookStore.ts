import { defineStore } from "pinia";
import { WorkbooksListType } from "@/type/workbook/WorkbooksListType";
import fetchWorkbook from "@/api/fetchWorbook";

interface WorkbookType {
  workbookList: WorkbooksListType;
}

export const useWorkbookStore = defineStore("workbook", {
  state: (): WorkbookType => {
    return {
      workbookList: {} as WorkbooksListType,
    };
  },
  persist: true,
  actions: {
    async fetchProjectList(siteId: string, projectId: string) {
      try {
        this.workbookList = await fetchWorkbook(siteId, projectId);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
