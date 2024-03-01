<script setup lang="ts">
import { ProjectType } from '@/types/project/ProjectType';
import { ref, defineProps } from 'vue';
import WorkbookList from '@/components/WorkbookList.vue'
import { useProjectStore } from '@/store/ProjectStore'
import { computed } from 'vue';

const emit = defineEmits(['navigateTo'])

const projectStore = useProjectStore()
const projectList = projectStore.projectList.projects.project

const props = defineProps<{
    projectData: ProjectType[],
    selectedProjectId: string,
    siteId: string,
}>()

const isOpen = ref(false)

const closeModal = () => {
    isOpen.value = false
}

const openModal = () => {
    if (props.selectedProjectId) {
        isOpen.value = true
    }
}

const selectedProjectTitle = computed(() => {
    return projectList.find((project) => project.id === props.selectedProjectId)?.name
})

const findNextProjectIndex = (direction: number) => {
    const currentIndex = props.projectData.findIndex((project) => project.id === props.selectedProjectId)
    const nextIndex = (currentIndex + direction)
    if (nextIndex < 0) {
        return props.projectData.length - 1
    } else if (nextIndex >= props.projectData.length) {
        return 0
    } else {
        return nextIndex
    }
}

const navigate = (direction: number) => {
    const nextIndex = findNextProjectIndex(direction)
    emit('navigateTo', nextIndex)
}

</script>

<template>
    <v-btn prepend-icon="mdi-cog" size="small" text="Workbooks" @click="openModal">
        List Workbooks
    </v-btn>
    <v-dialog v-model="isOpen" transition="dialog-bottom-transition" fullscreen>
        <v-card>
            <v-toolbar>
                <v-btn icon @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
                <v-btn icon @click="navigate(-1)"><v-icon>mdi-chevron-left</v-icon></v-btn>
                <v-toolbar-title class="text-center">{{ selectedProjectTitle }}</v-toolbar-title>
                <v-btn icon @click="navigate(1)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                <v-spacer></v-spacer>
            </v-toolbar>
            <div v-if="selectedProjectTitle">
                <WorkbookList :siteId="siteId" :projectName="selectedProjectTitle"></WorkbookList>
            </div>

        </v-card>
    </v-dialog>
</template>
