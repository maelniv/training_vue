<script setup lang="ts">
import { useProjectStore } from '@/store/ProjectStore'
import { useUserStore } from '@/store/UserStore'
import { ref, computed } from 'vue';
import ProjectModal from '@/components/ProjectModal.vue';

const projectStore = useProjectStore()
const userStore = useUserStore()
const siteId = ref(userStore.siteId)
const projectList = projectStore.projectList

const selectedProjectId = ref()
const selectedProjectTitle = computed(() => {
  return fakeData.find((project) => project.value === selectedProjectId.value)?.title
})

const fakeData = [
  { title: "Project 1", value: "1" },
  { title: "Project 2", value: "2" },
  { title: "Project 3", value: "3" },
  { title: "Project 4", value: "4" }
]

const navigateTo = (index: number) => {
  selectedProjectId.value = fakeData[index].value
}

</script>

<template>
  <v-select class="mt-12 mx-auto pa-16" label="Projects" :items="fakeData" v-model="selectedProjectId"
    variant="outlined"></v-select>
  <div class="text-center pa-4">
    <ProjectModal @navigateTo="navigateTo" :projectData="fakeData" :selectedProjectTitle="selectedProjectTitle" :selectedProjectId="selectedProjectId" />
  </div>
</template>
