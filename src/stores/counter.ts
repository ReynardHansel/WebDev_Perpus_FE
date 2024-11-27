import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useUserStore = defineStore('user', () => {
  const email = ref(localStorage.getItem('email') || '')
  const token = ref(localStorage.getItem('token') || '')
  const theCounter = ref(parseInt(localStorage.getItem('theCounter') || '0'))

  function setEmail(newEmail: string) {
    email.value = newEmail
    localStorage.setItem('email', newEmail)
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function incrementCounter() {
    theCounter.value++
    localStorage.setItem('theCounter', theCounter.value.toString())
  }

  function reset() {
    email.value = ''
    token.value = ''
    theCounter.value = 0
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('theCounter')
  }

  return { email, token, theCounter, setEmail, setToken, incrementCounter, reset }
})