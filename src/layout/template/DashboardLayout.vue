<template>
  <div id="wrapper">
      <slot />
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { usePhoenixNavbarLayout } from '@/composables/usePhoenixNavbarLayout'

const stylesheets = [
   'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap',
  '/vendors/simplebar/simplebar.min.css',
  '/assets/css/line.css',
  '/assets/css/theme.min.css',
  '/assets/css/user.min.css',
  '/vendors/leaflet/leaflet.css',
  '/assets/css/theme-rtl',
  '/assets/css/user-rtl.min.css',
  '/vendors/leaflet.markercluster/MarkerCluster.css',
  '/vendors/leaflet.markercluster/MarkerCluster.Default.css'
]


const scripts = [
  '/vendors/simplebar/simplebar.min.js',
  '/assets/js/config.js',
  '/vendors/popper/popper.min.js',
  '/vendors/bootstrap/bootstrap.min.js',
  '/vendors/anchorjs/anchor.min.js',
  '/vendors/is/is.min.js',
  '/vendors/fontawesome/all.min.js',
  '/vendors/lodash/lodash.min.js',
  '/vendors/list.js/list.min.js',
  '/vendors/feather-icons/feather.min.js',
  '/vendors/dayjs/dayjs.min.js',
  '/vendors/leaflet/leaflet.js',
  '/vendors/leaflet.markercluster/leaflet.markercluster.js',
  '/vendors/leaflet.tilelayer.colorfilter/leaflet-tilelayer-colorfilter.min.js',
  '/assets/js/phoenix.js',
  '/vendors/echarts/echarts.min.js',
  '/assets/js/dashboards/ecommerce-dashboard.js'
]

async function loadCssSequentially(links) {
  for (const href of links) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      await new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.onload = resolve
        link.onerror = reject
        document.head.appendChild(link)
      })
    }
  }
}

async function loadScriptSequentially(scripts) {
  for (const src of scripts) {
    if (!document.querySelector(`script[src="${src}"]`)) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = false
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }
  }
}

onMounted(async () => {
  await loadCssSequentially(stylesheets)
  await loadScriptSequentially(scripts)
  usePhoenixNavbarLayout()
})
</script>

<style>
body {
  font-size: 1rem;
  font-family: 'Nunito Sans', sans-serif;
}
svg.feather {
  width: 25px;
  height: 25px;
}
</style>
