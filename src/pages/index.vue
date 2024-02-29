<script lang="ts" setup>
import { useProjectStore } from '@/store/ProjectStore'
import { useUserStore } from '@/store/UserStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue';

const projectStore = useProjectStore()
const userStore = useUserStore()
const { projectList } = storeToRefs(projectStore)
const { siteId } = storeToRefs(userStore)
const printableProjectNameList = ref<string[]>([])
const dialog = ref(false)

const handleFetchProject = () => {
  projectStore.fetchProjectList(siteId.value)
}

const handleClose = () => {
  dialog.value = false
  console.log(dialog.value)
}

watch(dialog, () => {
  console.log(dialog.value)
})

watch(projectList, () => {
  printableProjectNameList.value = projectList.value.projects.project.map((project) => project.name)
})

onMounted(() => {
  handleFetchProject()
})

</script>

<template>
  <v-combobox class="mt-12 mx-auto pa-16" clearable label="Projects" :items="printableProjectNameList"
    variant="outlined"></v-combobox>

  <div class="text-center pa-4">
    <v-btn prepend-icon="mdi-cog" size="small" text="Workbooks" @click="dialog = true">
      List Workbooks
    </v-btn>

    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
    >
    <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="handleClose()"></v-btn>

          
          <v-toolbar-title>Project Name</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </div>
</template>
