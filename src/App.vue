<template>
  <component v-if="ready" :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { shallowRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from './layout/template/MainLayout.vue'
import DashboardLayout from './layout/template/DashboardLayout.vue'

const route = useRoute()
const layout = shallowRef(MainLayout)
const ready = ref(false)

<<<<<<< HEAD
      const dashboardLayoutRoutes = [
        '/dashboard_client',
        '/login_client',
        '/register_client',
        '/forgot_password_client',
        '/reset_password',
        '/edit_client',
        '/admin/dashboard',
        '/admin/login',
      ]
=======
const mainLayoutRoutes = [
  '/', '/presentation', '/transporteur', '/contact'
]
>>>>>>> 9fb67df9a66f881ef5d8d57256e053b6e8cdbf5e

const dashboardLayoutRoutes = [
  '/dashboard_client', '/login_client', '/register_client',
  '/forgot_password_client', '/reset_password', '/edit_client'
]

const setLayout = (path) => {
  if (mainLayoutRoutes.includes(path)) {
    layout.value = MainLayout
  } else if (dashboardLayoutRoutes.includes(path)) {
    layout.value = DashboardLayout
  } else {
    layout.value = MainLayout
  }
  ready.value = true
}

setLayout(route.path)

watch(() => route.path, (newPath) => {
  setLayout(newPath)
})
</script>
