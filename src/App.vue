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

const mainLayoutRoutes = ['/', '/presentation', '/transporteur', '/contact','/service']

const isDashboardDynamicRoute = (path) => {
  return path.startsWith('/edit_reservation')
}

const dashboardLayoutRoutes = [
  '/dashboard_client',
  '/login_client',
  '/register_client',
  '/forgot_password_client',
  '/reset_password',
  '/edit_client',
  '/admin/login',
  '/admin/dashboard',
  '/admin/liste-clients',
  '/reservation_client',
  '/reservations',
  '/admin/clients', // préfixe commun à /admin/clients/:id
]
const setLayout = (path) => {
  if (mainLayoutRoutes.includes(path)) {
    layout.value = MainLayout
  } else if (
    dashboardLayoutRoutes.includes(path) ||
    isDashboardDynamicRoute(path) ||
    dashboardLayoutRoutes.some((prefix) => path.startsWith(prefix))
  ) {
    layout.value = DashboardLayout
  } else {
    layout.value = MainLayout
  }
  ready.value = true
}


setLayout(route.path)

watch(
  () => route.path,
  (newPath) => {
    setLayout(newPath)
  },
)
</script>
