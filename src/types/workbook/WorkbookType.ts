export type WorkbookType = {
    contentUrl: string;
    createdAt: string;
    dataAccelerationConfig: {
        accelerationEnabled: boolean;
    };
    defaultViewId: string;
    description: string;
    encryptExtracts: string;
    id: string;
    location: {
        id: string;
        type: string;
        name: string;
    };
    name: string;
    owner: {
        id: string;
        name: string;
    };
    project: {
        id: string;
        name: string;
    };
    showTabs: string;
    size: string;
    updatedAt: string;
    webpageUrl: string;
}
