import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { enableUseIcons } from './configurations/FontAwesonIconsConfiguration'
import { enableUseToast } from './configurations/toastifyConfiguration'

const app = createApp(App)

// Style library settings
enableUseIcons(app)
enableUseToast(app)

app.mount('#app')
