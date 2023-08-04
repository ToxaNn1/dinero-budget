<template>
  <v-form @submit.prevent="login">
    <v-text-field v-model="authForm.email" label="description" />
    <v-text-field v-model="authForm.password" label="category" />
    <v-btn type="submit">Login</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const { loginUser, fetchUserFromFirebase } = useAuthStore()
const router = useRouter()
const authForm = reactive({
  email: 'test@gmail.com',
  password: 'test@gmail.com'
})

const login = async () => {
  await loginUser(authForm.email, authForm.password)
  await fetchUserFromFirebase()
  await router.push('/dashboard-page')
}
</script>
