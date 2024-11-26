<script setup>
import { useUserStore } from '@/stores/counter'

const store = useUserStore()

function increase() {
  store.theCounter++
}
</script>

<template>
  <button type="button" @click="increase()">COUNTER IN BARANG</button>
  <h3>Click to increase the Counter</h3>
</template>
