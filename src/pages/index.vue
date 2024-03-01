<script setup lang="ts">
import { useProjectStore } from '@/store/ProjectStore'
import { useUserStore } from '@/store/UserStore'
import { ref, computed, watch } from 'vue';
import ProjectModal from '@/components/ProjectModal.vue';

const projectStore = useProjectStore()
const userStore = useUserStore()
const siteId = ref(userStore.siteId)
const projectList = projectStore.projectList.projects.project

const selectedProjectId = ref()
const selectedProjectTitle = computed(() => {
  return projectList.find((project) => project.id === selectedProjectId.value)?.name
})

const navigateTo = (index: number) => {
  selectedProjectId.value = projectList[index].id
}

const handleFetchProjects = async () => {
  await projectStore.fetchProjectList(siteId.value)
}

watch(siteId, () => {
  handleFetchProjects()
});

</script>

<template>
  <v-select class="mt-12 mx-auto pa-16" label="Projects" :items="projectList" itemTitle="name" itemValue="id" v-model="selectedProjectId"
    variant="outlined"></v-select>
  <div class="text-center pa-4">
    <ProjectModal @navigateTo="navigateTo" :projectData="projectList" :selectedProjectTitle="selectedProjectTitle" :selectedProjectId="selectedProjectId" />
  </div>
</template>
