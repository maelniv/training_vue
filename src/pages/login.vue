<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/store/UserStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup'

const router = useRouter()
const userStore = useUserStore()
const isPasswordVisible = ref(false);
const { siteId, isUserConnected, errorMessage } = storeToRefs(userStore)

const loginFormSchema = yup.object().shape({
    email: yup.string().required('Email is required')
    // .email('Please enter a valid email'),
    ,
    password: yup.string().required('Password is required'),
});

const { validate, errors, defineField } = useForm({
    validationSchema: loginFormSchema,
    initialValues: {
        email: '',
        password: '',
    }
})

const [email] = defineField('email')
const [password] = defineField('password')

const handleSubmit = async () => {
    const state = await validate()
    if (state.valid) {
        userStore.login(email.value, password.value)
    }
}

watch(siteId, () => {
    if (isUserConnected.value) {
        router.push("/")
    }
});

watch([email, password], () => {
    if (errorMessage.value != "") {
        errorMessage.value = ""
    }
})

</script>

<template>
    <div class="split-container">
        <div class="left-section">
            <img src="@/assets/logo-wiiisdom-ops.png" alt="Wiiisdom logo">
        </div>
        <div class="right-section">
            <v-sheet class="mx-auto" width="300">
                <v-form @submit.prevent="handleSubmit" error-messages="test">
                    <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                    <v-text-field name="email" v-model="email" density="compact" placeholder="Email address"
                        prepend-inner-icon="mdi-email-outline" variant="outlined" autocomplete="username"
                        :error-messages="errors.email"></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Password
                    </div>
                    <v-text-field :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="isPasswordVisible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined" v-model="password"
                        autocomplete="current-password" @click:append-inner="isPasswordVisible = !isPasswordVisible"
                        :error-messages="errors.password">
                    </v-text-field>

                    <v-btn block class="mb-8" color="wiiisdom_orange" size="large" variant="tonal" type="submit">
                        Log In
                    </v-btn>

                    <v-alert v-if="errorMessage != ''" color="error" icon="$error" title="Erreur" :text="errorMessage">
                    </v-alert>
                </v-form>
            </v-sheet>
        </div>
    </div>
</template>
  
<style scoped>
.split-container {
    display: flex;
    height: 100vh;
}

.left-section {
    flex: 1;
    background: linear-gradient(to bottom, #0393f0, #1f1d74);
    display: flex;
    justify-content: center;
    align-items: center;
}

.right-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
