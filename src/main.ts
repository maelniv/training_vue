/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import pinia from '@/store/index'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(pinia)

registerPlugins(app)

app.mount('#app')
