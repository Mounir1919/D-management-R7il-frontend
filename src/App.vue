<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from './layout/template/MainLayout.vue'
import DashboardLayout from './layout/template/DashboardLayout.vue'

export default {
  computed: {
    layout() {
      const mainLayoutRoutes = ['/', '/presentation', '/transporteur', '/contact']

      const dashboardLayoutRoutes = [
        '/dashboard_client',
        '/login_client',
        '/register_client',
        '/forgot_password_client',
        '/reset_password'
      ]

      if (mainLayoutRoutes.includes(this.$route.path)) {
        return MainLayout
      } else if (dashboardLayoutRoutes.includes(this.$route.path)) {
        return DashboardLayout
      }

      // Layout par défaut si aucun ne correspond
      return 'MainLayout'
    }
  },
  components: {
    MainLayout,
    DashboardLayout
  }
}
</script>

<!-- ❌ AUCUN CSS GLOBAL ICI -->
