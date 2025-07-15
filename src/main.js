import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

document.body.classList.add('loading')



// Créer une instance de l'application Vue
const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
  document.getElementById('initial-loader').remove()
  document.body.classList.remove('loading')
})
// Utiliser Pinia et le routeur
app.use(createPinia())
createApp(App).use(router).mount('#app')
