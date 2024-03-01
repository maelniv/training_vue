import { WorkbookType } from "./WorkbookType";

export type WorkbooksListType = {
    pagination: {
        pageNumber: string;
        pageSize: string;
        totalAvailable: string;
    };
    workbooks: {
        workbook: WorkbookType[];
    };
}