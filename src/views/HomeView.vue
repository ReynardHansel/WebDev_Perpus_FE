<script setup>
import { useUserStore } from '@/stores/counter'

const store = useUserStore()
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Our App</h1>
    <p class="mb-4">This is the home page of our application.</p>
    <p v-if="store.token" class="text-green-600">You are logged in.</p>
    <p v-else class="text-red-600">You are not logged in.</p>
  </div>
</template>