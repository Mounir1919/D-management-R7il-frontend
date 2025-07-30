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
                  <p class="mb-1"><strong>Statut :</strong> {{ statutValidation }}</p>
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

                  <!-- Profil incomplet -->
                  <div v-if="missingFields.length">
                    <div class="alert alert-warning">
                      <strong>⚠️ Votre profil est incomplet :</strong>
                      <ul class="mb-0">
                        <li v-for="field in missingFields" :key="field">{{ field }}</li>
                      </ul>
                      <hr />
                      <p>
                        Merci de compléter votre profil pour permettre sa validation par l’administration.
                      </p>
                    </div>
                  </div>

                  <!-- Profil complet -->
                  <div v-else>
                    <div v-if="user?.statut_validation === 'valide'" class="alert alert-success">
                      ✅ Votre profil est validé par l’administration.
                    </div>

                    <div v-else-if="user?.statut_validation === 'en_attente'">
                      <div v-if="user.type === 'transporteur'" class="alert alert-info">
                        ⏳ Votre profil est complet et en attente de validation.
                      </div>
                      <div v-else-if="user.type === 'client'" class="alert alert-success">
                        ⏳ Votre profil est complet. Vous pouvez faire des réservations.
                      </div>
                    </div>

                    <div v-else-if="user?.statut_validation === 'refuse'" class="alert alert-danger">
                      ❌ Votre profil a été refusé. Veuillez vérifier les informations fournies et réessayer.
                    </div>

                    <div v-else class="alert alert-secondary">
                      ℹ️ Statut de validation inconnu.
                    </div>
                  </div>

                  <a href="/edit_client" class="btn btn-sm btn-primary me-2">
                    Modifier mon profil
                  </a>
                  <button @click="logout_client" class="btn btn-sm btn-outline-danger">
                    Se déconnecter
                  </button>
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

const logout = () => {
  localStorage.removeItem('transporteur_token')
  window.location.href = '/login_client'
}

const missingFields = computed(() => {
  if (!user.value) return []

  const required = []

  if (!user.value.nom) required.push('Nom')

  if (user.value.type === 'transporteur') {
    if (!user.value.vehicule) required.push('Nom du véhicule')
    if (!user.value.permis) required.push('Permis de conduire (image)')
    if (!user.value.carte_grise) required.push('Carte grise (image)')
    if (!user.value.photo_vehicule) required.push('Photo du véhicule')
  }

  if (!user.value.adresse) required.push('Adresse')
  if (!user.value.telephone) required.push('Téléphone')

  return required
})

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

onMounted(async () => {
  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data

    if (user.value.type === 'transporteur' && missingFields.value.length > 0) {
      console.warn('⚠️ Ce profil est incomplet, une notification devrait être envoyée à l’admin.')
      // Eventuellement poster notification backend ici
    }
  } catch (err) {
    error.value = 'Accès refusé ou session expirée.'
    logout()
  }
})

const statutValidation = computed(() => {
  if (!user.value?.statut_validation) return 'Non renseigné'

  switch (user.value.statut_validation) {
    case 'en_attente':
      return user.value.type === 'transporteur'
        ? '⏳ En attente de validation'
        : '✅ Validé'
    case 'valide':
      return '✅ Validé'
    case 'refuse':
      return '❌ Refusé'
    default:
      return user.value.statut_validation
  }
})
</script>
