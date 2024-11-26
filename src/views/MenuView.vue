<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { storeToRefs, createPinia } from 'pinia'

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
