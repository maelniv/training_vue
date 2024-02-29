import axios from './axios.js'

import { WorkbooksListType } from '@/type/workbook/WorkbooksListType.js';

export default function fetchWorkbook(siteId: string, projectId: string) : Promise<WorkbooksListType> {
    return new Promise<WorkbooksListType>((resolve, reject) => {
        axios.get(`/sites/${siteId}/workbooks/${projectId}`, {
        }).then(function (response: any) {
            const workbookList = response.data as WorkbooksListType
            resolve(workbookList);
        }).catch((error: any) => {
            reject(error);
        });
    });
}