import axios from './axios.js'

import { WorkbooksListType } from '@/types/workbook/WorkbooksListType.js';

export default function fetchWorkbook(siteId: string, projectName: string) : Promise<WorkbooksListType> {
    return new Promise<WorkbooksListType>((resolve, reject) => {
        axios.get(`/sites/${siteId}/workbooks?filter=projectName:eq:${projectName}`, {
        }).then(function (response: any) {
            const workbookList = response.data as WorkbooksListType
            resolve(workbookList);
        }).catch((error: any) => {
            reject(error);
        });
    });
}