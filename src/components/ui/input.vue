<template>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      :class="[variants[variant], sizes[size], { 'w-full': block }]"
      :disabled="disabled"
      v-bind="$attrs"
    />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  const props = withDefaults(
    defineProps<{
      modelValue: string
      type?: string
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
      size?: 'default' | 'sm' | 'lg'
      block?: boolean
      disabled?: boolean
    }>(),
    {
      type: 'text',
      variant: 'default',
      size: 'default',
      block: false,
      disabled: false,
    }
  )
  
  defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
  
  const variants = {
    default: 'border-input',
    destructive: 'border-destructive',
    outline: 'border-input',
    secondary: 'border-secondary',
    ghost: 'border-transparent',
    link: 'border-transparent',
  }
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
  }
  </script>