<template>
  <AppHeader>
    <template #default>
      <section class="p-4">
        <div v-if="user">
          <h2 class="mb-2">Bienvenue {{ user.nom }}</h2>
          <p class="mb-1">Email : {{ user.email }}</p>
          <p class="mb-1">Type : {{ user.type }}</p>
          <p class="mb-1">Statut validation : {{ user.statut_validation }}</p>
          <button @click="logout" class="btn btn-outline-danger mt-3">Se déconnecter</button>
        </div>

        <div v-else-if="error">
          <div class="alert alert-danger">{{ error }}</div>
        </div>

        <div v-else>
          <p>Chargement...</p>
        </div>
      </section>
    </template>
  </AppHeader>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '../../components/DashboardC/AppHeader.vue'
import axios from '@/axios' // ⚠️ Très important : fichier avec intercepteur token

const user = ref(null)
const error = ref('')

const logout = () => {
  localStorage.removeItem('transporteur_token')
  window.location.href = '/login_client'
}

onMounted(async () => {
  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data
  } catch (err) {
    error.value = 'Accès refusé ou session expirée.'
    logout()
  }
})
</script>
