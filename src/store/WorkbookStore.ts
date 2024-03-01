import { defineStore } from "pinia";
import { WorkbooksListType } from "@/types/workbook/WorkbooksListType";
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
    async fetchWorkbookList(siteId: string, projectName: string) {
      try {
        this.workbookList = await fetchWorkbook(siteId, projectName);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
