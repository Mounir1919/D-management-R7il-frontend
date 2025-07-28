<template>
  <AppHeader>
    <template #default>
      <section class="container py-5">
        <div v-if="user">
          <h2 class="mb-3">👋 Bienvenue, {{ user.nom }}</h2>

          <div class="row mb-4">
            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">Informations personnelles</h5>
                  <p class="mb-1"><strong>Email :</strong> {{ user.email }}</p>
                  <p class="mb-1"><strong>Type :</strong> {{ user.type }}</p>
                  <p class="mb-1"><strong>Statut :</strong> {{ user.statut_validation }}</p>
                  <p class="mb-1"><strong>Date d'inscription :</strong> {{ dateInscription }}</p>
                  <p v-if="user.abonnement_actif && user.date_fin_essai">
                    <strong>Fin de période d'essai :</strong> {{ dateFinEssai }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">Profil & Documents</h5>

                  <div v-if="missingFields.length">
                    <div class="alert alert-warning">
                      <strong>⚠️ Votre profil est incomplet :</strong>
                      <ul class="mb-0">
                        <li v-for="field in missingFields" :key="field">{{ field }}</li>
                      </ul>
                      <hr />
                      <p >
                        Merci de compléter votre profil pour permettre sa validation par l’administration.
                      </p>
                    </div>
                  </div>

                  <p v-else class="text-success mb-2">✅ Votre profil est complet et en attente de validation.</p>

                  <a href="/edit_client" class="btn btn-sm btn-primary me-2">
                    Modifier mon profil
                  </a>
                  <button @click="logout_client" class="btn btn-sm btn-outline-danger">Se déconnecter</button>
                </div>
              </div>
            </div>
          </div>
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
import { ref, computed, onMounted } from 'vue'
import AppHeader from '../../components/DashboardC/AppHeader.vue'
import axios from '@/axios'

const user = ref(null)
const error = ref('')

// ➤ Redirection logout
const logout = () => {
  localStorage.removeItem('transporteur_token')
  window.location.href = '/login_client'
}

// ➤ Vérifie les champs obligatoires
const missingFields = computed(() => {
  if (!user.value || user.value.type === 'client') return []

  const required = []
  if (!user.value.nom) required.push('Nom')
  if (!user.value.vehicule) required.push('Nom du véhicule')
  if (!user.value.permis) required.push('Permis de conduire (image)')
  if (!user.value.carte_grise) required.push('Carte grise (image)')
  if (!user.value.photo_vehicule) required.push('Photo du véhicule')
  if (!user.value.adresse) required.push('Adresse')
  if (!user.value.telephone) required.push('Téléphone')

  return required
})

// ➤ Dates formatées
const dateInscription = computed(() => {
  if (!user.value?.date_inscription) return 'Non disponible'
  return new Date(user.value.date_inscription).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const dateFinEssai = computed(() => {
  if (!user.value?.date_fin_essai) return 'Non disponible'
  return new Date(user.value.date_fin_essai).toLocaleDateString('fr-FR')
})
// Déconnexion
const logout_client = async () => {
  try {
    await axios.post('/transporteur/logout_client')
    localStorage.removeItem('transporteur_token')
    window.location.href = '/login_client'
  } catch (err) {
    console.error('Erreur lors de la déconnexion :', err)
    window.location.href = '/login_client'
  }
}

// ➤ Appel API
onMounted(async () => {
  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data

    // ✅ Si le profil est incomplet → notifier (plus tard : envoyer au back ou via socket)
    if (user.value.type === 'transporteur' && missingFields.value.length > 0) {
      console.warn('⚠️ Ce profil est incomplet, une notification devrait être envoyée à l’admin.')
      // Tu peux ici déclencher une notification ou envoyer à une route Laravel
      // await axios.post('/admin/notifier_profil_incomplet', { user_id: user.value.id, champs: missingFields.value })
    }

  } catch (err) {
    error.value = 'Accès refusé ou session expirée.'
    logout()
  }
})
</script>
