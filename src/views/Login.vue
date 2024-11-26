<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const theRouter = useRouter()
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
  axios({
    url: 'http://localhost/perpus/public/api/login',
    method: 'POST',
    headers: customConfig,
    data: bodyParameters.value,
  })
    .then((response) => {
      auth.value = response.data
      console.log(response.data)
      if (auth.value.success === true) {
        ;(store.email = username.value),
          (store.token = auth.value.data),
          store.theCounter++,
          theRouter.push('/menu')
      }
    })
    .catch((error) => {
      console.log('AJAX' + error)
    })
}
</script>
