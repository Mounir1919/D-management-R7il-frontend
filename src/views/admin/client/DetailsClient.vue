<template>
  <AppHeader>
    <main class="main" id="top">
      <div v-if="client">
        <h2>Détails du client : {{ client.nom }}</h2>
        <img :src="`http://127.0.0.1:8000/${client.photo_profil}`" width="100" />
        <p><strong>Email:</strong> {{ client.email }}</p>
        <p><strong>Adresse:</strong> {{ client.adresse }}</p>
        <p><strong>Téléphone:</strong> {{ client.telephone }}</p>
        <!-- Ajoute plus d'infos ici si tu veux -->
      </div>
    </main>
  </AppHeader>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppHeader from '@/components/admin/AppHeader.vue'
const route = useRoute()
const client = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients/${id}`)
    client.value = response.data
  } catch (error) {
    console.error('Erreur chargement client', error)
  }
})
</script>
