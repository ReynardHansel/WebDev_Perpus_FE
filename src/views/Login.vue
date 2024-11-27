<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card.vue'
import { ArrowRightIcon } from 'lucide-vue-next'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const router = useRouter()
const auth = ref(null)
const username = ref('')
const password = ref('')
const store = useUserStore()

const customConfig = {
  'Content-Type': 'application/json',
}

const bodyParameters = computed(() => {
  return {
    email: username.value,
    password: password.value,
  }
})

function login() {
  console.log('Data being sent to backend:', bodyParameters.value)

  axios
    .post('http://127.0.0.1:8000/api/login', bodyParameters.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      auth.value = response.data
      console.log(response.data)
      if (auth.value.success === true) {
        store.setEmail(username.value)
        store.setToken(auth.value.data)
        store.incrementCounter()
        router.push('/menu')
      }
    })
    .catch((error) => {
      console.log('AJAX' + error)
    })
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-14rem)]">
    <Card class="w-full max-w-md p-8 bg-[#F3F0FF]">
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-4">
          <span class="text-3xl font-bold text-white">C</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">SISTEM PENJUALAN</h2>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <Input
            id="username"
            v-model="username"
            type="email"
            required
            placeholder="vivi@yahoo.com"
            class="bg-[#FEFCE8] border-transparent focus:border-[#6D28D9] focus:ring-[#6D28D9]"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <Input
            id="password"
            v-model="password"
            type="password"
            required
            class="bg-[#FEFCE8] border-transparent focus:border-[#6D28D9] focus:ring-[#6D28D9]"
          />
        </div>
        <Button type="submit" class="w-32 bg-[#4F46E5] hover:bg-[#4338CA] text-white">
          <span>LOGIN</span>
          <ArrowRightIcon class="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div class="mt-6 text-center text-sm">
        <span class="text-gray-600">Don't have an account? </span>
        <RouterLink to="/register" class="text-[#4F46E5] hover:underline">Register</RouterLink>
      </div>
    </Card>
  </div>
</template>
