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
const userStore = useUserStore()
const { siteId, isUserConnected } = storeToRefs(userStore)

const { value: email, errorMessage: emailError } = useField('email', yup.string().required('Email is required').email('Please enter a valid email'));
const { value: password, errorMessage: passwordError } = useField('password', yup.string().required('Password is required'));

const handleSubmit = async () => {
    try {
        await validate();
        // userStore.login(email.value as string, password.value as string);
    } catch {
        console.error("Invalid form")
    }
}

watch(siteId, () => {
    if (isUserConnected.value) {
        router.push("/")
    }
});

const schema = yup.object({
    email,
    password
});

const { validate } = useForm<LoginForm>({
    validationSchema: schema,
});
</script>

<template>
    <div>
        <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="handleSubmit">
                <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" v-model="email" autocomplete="username"
                    :error-messages="emailError"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" v-model="password" autocomplete="current-password"
                    @click:append-inner="visible = !visible" :error-messages="passwordError"></v-text-field>

                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit">
                    Log In
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>
