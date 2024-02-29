<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/store/UserStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

const router = useRouter()
const visible = ref(false);
const username = ref("")
const password = ref("")
const userStore = useUserStore()
const { siteId, isUserConnected } = storeToRefs(userStore)

const handleLogin = () => {
    userStore.registerUser(username.value, password.value)
}

watch(siteId, () => {
    if (isUserConnected.value) {
        router.push("/")
    }
});

</script>

<template>
    <div>
        <v-sheet class="mx-auto" width="300">
            <v-form>
                <div class="text-subtitle-1 text-medium-emphasis">Username</div>

                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" v-model="username" autocomplete="username"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" v-model="password" autocomplete="current-password"
                    @click:append-inner="visible = !visible"></v-text-field>

                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="handleLogin()">
                    Log In
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>
