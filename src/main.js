import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


// Créer une instance de l'application Vue
const app = createApp(App)

// Utiliser Pinia et le routeur
app.use(createPinia())
createApp(App).use(router).mount('#app')
