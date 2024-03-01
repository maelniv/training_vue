<script setup lang="ts">

import { useWorkbookStore } from '@/store/WorkbookStore';
import { WorkbookType } from '@/types/workbook/WorkbookType';
import { watchEffect } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
    siteId: string,
    projectName: string,
}>()

const workbookStore = useWorkbookStore()
const workbookList = ref<WorkbookType[]>([])

const handleFetchWorkbooks = async () => {
    await workbookStore.fetchWorkbookList(props.siteId, props.projectName)
    workbookList.value = workbookStore.workbookList.workbooks.workbook;
}

watchEffect(() => {
    handleFetchWorkbooks()
})

</script>

<template>
    <div v-if="workbookList">
        <v-card v-for="workbook in workbookList" :key="workbook.id">
            <v-card-title> {{ workbook.name }}</v-card-title>
        </v-card>
    </div>
</template>