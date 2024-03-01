<script setup lang="ts">
import { useProjectStore } from '@/store/ProjectStore'
import { useUserStore } from '@/store/UserStore'
import { ref } from 'vue';
import ProjectModal from '@/components/ProjectModal.vue';
import { ProjectType } from '@/types/project/ProjectType';

const projectStore = useProjectStore()
const userStore = useUserStore()

const siteId = ref(userStore.siteId)
const projectList = ref<ProjectType[]>([])

const selectedProjectId = ref()

const navigateTo = (index: number) => {
  selectedProjectId.value = projectList.value[index].id
}

const handleFetchProjects = async () => {
  await projectStore.fetchProjectList(siteId.value)
  projectList.value = projectStore.projectList.projects.project
}

handleFetchProjects()

</script>

<template>
  <v-select class="mt-12 mx-auto pa-16" label="Projects" :items="projectList" itemTitle="name" itemValue="id"
    v-model="selectedProjectId" variant="outlined"></v-select>
  <div class="text-center pa-4" v-if="selectedProjectId">
    <ProjectModal @navigateTo="navigateTo" :siteId="siteId" :projectData="projectList"
      :selectedProjectId="selectedProjectId" />
  </div>
</template>
@/types/project/ProjectType