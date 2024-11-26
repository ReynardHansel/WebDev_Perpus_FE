<script setup>
import { useUserStore } from '@/stores/counter'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'

const store = useUserStore()

function increase() {
  store.theCounter++
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold">Pegawai (Employee) Management</h2>
    <Card class="p-6">
      <h3 class="text-xl font-semibold mb-4">Counter: {{ store.theCounter }}</h3>
      <Button @click="increase" variant="default">Increase Counter</Button>
    </Card>
    <!-- Add more employee management features here -->
  </div>
</template>