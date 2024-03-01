<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/store/UserStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'

interface LoginForm {
    email: string;
    password: string;
};

const router = useRouter()
const visible = ref(false);
const username = useField("username", yup.string().required("Password is required"));
const password = useField("password", yup.string().email("Email must be valid").required("Email is required"));
const userStore = useUserStore()
const { siteId, isUserConnected } = storeToRefs(userStore)

const handleLogin = () => {
    try {
        await validate();
        userStore.registerUser(username, password)

    }
}

watch(siteId, () => {
    if (isUserConnected.value) {
        router.push("/")
    }
});

const { handleSubmit, validate } = useForm<LoginForm>();

</script>

<template>
    <div>
        <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="handleLogin">
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
