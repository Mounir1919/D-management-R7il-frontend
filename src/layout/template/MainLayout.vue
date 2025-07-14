<template>
  <div id="wrapper">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../../components/template/Header.vue'
import AppFooter from '../../components/template/Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    // Charger dynamiquement le CSS
    this.injectCss()

    // Initialiser les scripts si nécessaires
    setTimeout(() => {
      if (window?.init) window.init()
    }, 100)
  },
  beforeUnmount() {
    const link = document.getElementById('main-layout-css')
    if (link) {
      document.head.removeChild(link)
    }
  },
  methods: {
    injectCss() {
      if (!document.getElementById('main-layout-css')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/assets/template/css/main-layout.css' // 💡 adapter si nécessaire
        link.id = 'main-layout-css'
        document.head.appendChild(link)
      }
    }
  }
}
</script>
