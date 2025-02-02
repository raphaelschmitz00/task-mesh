import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import iconSet from 'quasar/icon-set/material-icons'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './pages/router'

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, { plugins: {}, iconSet })
app.use(router)

app.mount('#app')
