<template>
  <AppHeader>
    <template #default>
      <main class="main" id="top">
        <section class="pt-5 pb-9">
          <div class="container-small">
            <div class="row align-items-center justify-content-between g-3 mb-4">
              <div class="col-auto">
                <h2 class="mb-0">Modifier le statut de la réservation</h2>
              </div>
            </div>

            <div class="card">
              <div class="card-body">

                <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                  </div>
                </div>

                <div v-else>
                  <div class="mb-3">
                    <strong>Statut actuel :</strong> <span style="color:green;">{{ translateStatus(reservationStatut) }}</span>
                  </div>

                  <div v-if="!editable" class="alert alert-success">
                    🎉 La course est terminée.
                  </div>

                 <div v-if="showAcceptMessage" class="alert alert-info">
    ✅ Réservation acceptée. Vous devez maintenant la terminer ou l'annuler plus tard.
  </div>

                  <div v-if="success" class="alert alert-success">{{ success }}</div>
                  <div v-if="error" class="alert alert-danger">{{ error }}</div>

                  <form @submit.prevent="submitForm" class="row g-3">
                    <!-- Champs désactivés -->
                    <div class="col-md-6" v-for="(value, key) in readonlyFields" :key="key">
                      <label class="form-label">{{ labels[key] }}</label>
                      <input v-if="key !== 'details'" :value="value" class="form-control" disabled />
                      <textarea v-else :value="value" class="form-control" rows="3" disabled></textarea>
                    </div>

                    <!-- Statut -->
                    <div class="col-md-6">
                      <label class="form-label">Modifier le statut</label>
                      <select v-model="selectedStatus" id="statut" class="form-select" :disabled="!editable">
                        <!-- En attente -> Acceptée -->
                        <option value="en_attente" v-if="reservationStatut === 'en_attente'">En attente</option>
                        <option value="acceptee" v-if="reservationStatut === 'en_attente' || selectedStatus === 'acceptee'">Acceptée</option>


                      </select>
                    </div>

                    <div class="col-12 text-end">
                      <button type="submit" class="btn btn-primary" :disabled="!editable || selectedStatus === reservationStatut">
                        Mettre à jour le statut
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </template>
  </AppHeader>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/axios'
import AppHeader from '../../components/DashboardC/AppHeader.vue'

const route = useRoute()

const success = ref('')
const error = ref('')
const reservationStatut = ref('')
const editable = ref(false)
const isLoading = ref(true)
const selectedStatus = ref('')
const showAcceptMessage = ref(false)  // Message affiché uniquement après validation du statut acceptee

const form = ref({
  adresse_depart: '',
  ville_depart: '',
  adresse_arrivee: '',
  ville_arrivee: '',
  date_heure: '',
  etage: '',
  ascenseur: '',
  surface: null,
  type_bien: '',
  details: '',
})

const labels = {
  adresse_depart: 'Adresse de départ',
  ville_depart: 'Ville de départ',
  adresse_arrivee: 'Adresse d\'arrivée',
  ville_arrivee: 'Ville d\'arrivée',
  date_heure: 'Date et heure',
  etage: 'Étage',
  ascenseur: 'Ascenseur',
  surface: 'Surface (m²)',
  type_bien: 'Type de bien',
  details: 'Détails supplémentaires'
}

const readonlyFields = computed(() => form.value)

const loadReservation = async () => {
  try {
    const token = localStorage.getItem('transporteur_token')
    const res = await axios.get(`/transporteur/reservations/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const r = res.data.reservation

    reservationStatut.value = r.statut
    selectedStatus.value = r.statut
    editable.value = !['terminee', 'annulee'].includes(r.statut)
    showAcceptMessage.value = false // Reset message au chargement

    form.value = {
      adresse_depart: r.adresse_depart || '',
      ville_depart: r.ville_depart || '',
      adresse_arrivee: r.adresse_arrivee || '',
      ville_arrivee: r.ville_arrivee || '',
      date_heure: r.date_heure ? r.date_heure.slice(0, 16) : '',
      etage: r.etage || '',
      ascenseur: r.ascenseur ? 'oui' : 'non',
      surface: r.surface ? parseFloat(r.surface) : null,
      type_bien: r.type_bien || '',
      details: r.details || '',
    }
  } catch (err) {
    error.value = '❌ Impossible de charger la réservation.'
  } finally {
    isLoading.value = false
  }
}

const submitForm = async () => {
  if (!editable.value || selectedStatus.value === reservationStatut.value) return

  error.value = ''
  success.value = ''
  showAcceptMessage.value = false // Reset avant la tentative de mise à jour

  try {
    const token = localStorage.getItem('transporteur_token')
    await axios.put(
      `/transporteur/reservations/${route.params.id}`,
      { statut: selectedStatus.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    success.value = '✅ Statut mis à jour avec succès.'
    reservationStatut.value = selectedStatus.value
    editable.value = !['terminee', 'annulee'].includes(selectedStatus.value)

    if (selectedStatus.value === 'acceptee') {
      showAcceptMessage.value = true
    }
  } catch (err) {
    error.value = err.response?.data?.message || '❌ Erreur lors de la mise à jour.'
  }
}

onMounted(() => {
  loadReservation()
})

function translateStatus(statut) {
  const statusMap = {
    en_attente: 'En attente',
    acceptee: 'Acceptée',
    terminee: 'Terminée',
    annulee: 'Annulée',
  }
  return statusMap[statut] || statut
}
</script>
