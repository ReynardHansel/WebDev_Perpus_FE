<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { storeToRefs, createPinia } from 'pinia'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'

const pini = createPinia()
const store = useUserStore()
const { theCounter } = storeToRefs(store)
const theRouter = useRouter()

const customConfig = {
  headers: {
    Authorization: 'Bearer ' + store.token,
  },
}

function logout() {
  axios({
    url: 'http://localhost/perpus/public/api/logout',
    method: 'GET',
    headers: customConfig.headers,
  })
    .then((response) => {
      console.log(response.data)
      if (response.data.success === true) {
        store.reset()
        theRouter.push('/')
      }
    })
    .catch((error) => {
      console.log('AJAX' + error)
    })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold">Menu</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RouterLink to="/pegawai">
        <Card class="p-6 hover:bg-accent hover:text-accent-foreground transition-colors">
          <h3 class="text-2xl font-semibold mb-2">Pegawai</h3>
          <p class="text-muted-foreground">Manage employee information</p>
        </Card>
      </RouterLink>
      <RouterLink to="/barang">
        <Card class="p-6 hover:bg-accent hover:text-accent-foreground transition-colors">
          <h3 class="text-2xl font-semibold mb-2">Barang</h3>
          <p class="text-muted-foreground">Manage inventory items</p>
        </Card>
      </RouterLink>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-lg">Counter: {{ theCounter }}</p>
      <Button @click="logout" variant="destructive">Logout</Button>
    </div>
  </div>
</template>