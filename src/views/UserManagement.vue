<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card.vue'

const store = useUserStore()
const router = useRouter()
const users = ref([])
const newUser = ref({ name: '', email: '', password: '' })
const editingUser = ref(null)
const isEditing = ref(false)

const fetchUsers = async () => {
  if (!store.token) {
    console.log('No token found, redirecting to login')
    router.push('/')
    return
  }

  try {
    console.log('store data:', store)
    const response = await axios.get('http://127.0.0.1:8000/api/users', {
      headers: { Authorization: `Bearer ${store.token}` },
    })
    users.value = response.data
    console.log('Fetched users:', users.value)
  } catch (error) {
    console.error('Error fetching users:', error)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login')
      store.reset()
      router.push('/')
    }
  }
}

const addUser = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/users', newUser.value, {
      headers: { Authorization: `Bearer ${store.token}` }
    })
    newUser.value = { name: '', email: '', password: '' }
    await fetchUsers()
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

const startEdit = (user) => {
  editingUser.value = { ...user }
  isEditing.value = true
}

const updateUser = async () => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/users/${editingUser.value.id}`, editingUser.value, {
      headers: { Authorization: `Bearer ${store.token}` }
    })
    isEditing.value = false
    editingUser.value = null
    await fetchUsers()
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

const deleteUser = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${store.token}` }
      })
      await fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

const userName = computed({
  get: () => isEditing.value ? editingUser.value.name : newUser.value.name,
  set: (value) => {
    if (isEditing.value) {
      editingUser.value.name = value
    } else {
      newUser.value.name = value
    }
  }
})

const userEmail = computed({
  get: () => isEditing.value ? editingUser.value.email : newUser.value.email,
  set: (value) => {
    if (isEditing.value) {
      editingUser.value.email = value
    } else {
      newUser.value.email = value
    }
  }
})

onMounted(fetchUsers)
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold">User Management</h2>
    
    <Card class="p-6">
      <h3 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
      <form @submit.prevent="isEditing ? updateUser() : addUser()" class="space-y-4">
        <Input 
          v-model="userName" 
          placeholder="Name" 
          required
        />
        <Input 
          v-model="userEmail" 
          type="email" 
          placeholder="Email" 
          required
        />
        <Input 
          v-if="!isEditing"
          v-model="newUser.password" 
          type="password" 
          placeholder="Password" 
          required
        />
        <Button type="submit">
          {{ isEditing ? 'Update User' : 'Add User' }}
        </Button>
        <Button v-if="isEditing" @click="isEditing = false; editingUser = null" variant="outline">
          Cancel
        </Button>
      </form>
    </Card>

    <Card class="p-6">
      <h3 class="text-xl font-semibold mb-4">User List</h3>
      <div class="space-y-4">
        <div v-for="user in users" :key="user.id" class="flex border border-black dark:border-white justify-between items-center p-4 bg-transparent rounded-md">
          <div>
            <p class="font-semibold">{{ user.name }}</p>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
          </div>
          <div class="space-x-2">
            <Button @click="startEdit(user)" variant="outline">Edit</Button>
            <Button @click="deleteUser(user.id)" variant="destructive">Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>