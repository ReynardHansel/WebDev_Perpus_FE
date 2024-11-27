<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/counter'
import Footer from './views/Footer.vue';

const store = useUserStore()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b sticky top-0 bg-white dark:bg-gray-900">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <img alt="Vue logo" class="h-8 w-8" src="@/assets/logo.svg" />
            <span class="text-xl font-semibold">Sistem Penjualan</span>
          </div>
          <div class="space-x-4">
            <RouterLink v-if="!store.token" to="/" class="text-sm font-medium hover:underline">Login</RouterLink>
            <RouterLink v-if="store.token" to="/menu" class="text-sm font-medium hover:underline">Menu</RouterLink>
            <RouterLink to="/about" class="text-sm font-medium hover:underline">About</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8 min-h-screen">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>