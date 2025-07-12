<!-- src/views/GoogleLoginSuccess.vue -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  if (token) {
    localStorage.setItem('transporteur_token', token)
    window.location.href = '/dashboard_client' // Redirection directe
  } else {
    window.location.href = '/login_client' // Rediriger si erreur
  }
})
</script>

<template>
  <div class="text-center p-5">
    <h2>Connexion Google en cours...</h2>
  </div>
</template>
