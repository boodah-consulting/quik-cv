import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import router from './router'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)
app.use(Quasar, quasarUserOptions)
app.use(router)
app.mount('#app')
