<template>
  <AppHeader>
    <template #default>
      <main class="main" id="top">
        <section class="pt-5 pb-9">
          <div class="container-small">
            <div class="row align-items-center justify-content-between g-3 mb-4">
              <div class="col-auto">
                <h2 class="mb-0">Modifier ma réservation</h2>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <p class="mb-3">Vous pouvez mettre à jour les informations de votre réservation ici.</p>

                <!-- 🔄 Spinner de chargement -->
                <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                  </div>
                </div>

                <div v-else>
                  <div v-if="!editable" class="alert alert-warning">
                    ⚠️ Cette réservation ne peut plus être modifiée (statut : {{ translateStatus(reservationStatut) }}).
                  </div>

                  <div v-if="success" class="alert alert-success">{{ success }}</div>
                  <div v-if="error" class="alert alert-danger">{{ error }}</div>

                  <form @submit.prevent="submitForm" class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Adresse de départ</label>
                      <input v-model="form.adresse_depart" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Ville de départ</label>
                      <input v-model="form.ville_depart" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Adresse d'arrivée</label>
                      <input v-model="form.adresse_arrivee" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Ville d'arrivée</label>
                      <input v-model="form.ville_arrivee" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Date et heure</label>
                      <input v-model="form.date_heure" type="datetime-local" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Étage</label>
                      <input v-model="form.etage" type="number" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Ascenseur</label>
                      <select v-model="form.ascenseur" class="form-select" :disabled="!editable">
                        <option disabled value="">Ascenseur disponible ?</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Surface (m²)</label>
                      <input
                        v-model.number="form.surface"
                        type="number"
                        min="1"
                        step="0.1"
                        class="form-control"
                        :disabled="!editable"
                        placeholder="Surface en m²"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Type de bien</label>
                      <input v-model="form.type_bien" class="form-control" :disabled="!editable" />
                    </div>
                    <div class="col-12">
                      <label class="form-label">Détails supplémentaires</label>
                      <textarea
                        v-model="form.details"
                        class="form-control"
                        rows="3"
                        :disabled="!editable"
                        placeholder="Ex : objets fragiles, conditions spéciales..."
                      ></textarea>
                    </div>
                    <div class="col-12 text-end">
                      <button type="submit" class="btn btn-primary" :disabled="!editable">
                        Mettre à jour la réservation
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'
import AppHeader from '../../components/DashboardC/AppHeader.vue'

const route = useRoute()
const router = useRouter()

const success = ref('')
const error = ref('')
const reservationStatut = ref('')
const editable = ref(false)
const isLoading = ref(true) // ✅ Spinner

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

const loadReservation = async () => {
  try {
    const res = await axios.get(`/reservations/${route.params.id}`)
    const r = res.data

    reservationStatut.value = r.statut
    editable.value = r.statut === 'en_attente'

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
    isLoading.value = false // ✅ désactive le spinner
  }
}

const submitForm = async () => {
  if (!editable.value) return

  error.value = ''
  success.value = ''

  try {
    await axios.put(`/reservations/${route.params.id}`, {
      ...form.value,
      ascenseur: form.value.ascenseur === 'oui' ? 1 : 0,
      surface: form.value.surface ? parseFloat(form.value.surface) : null,
    })

    success.value = '✅ Réservation mise à jour avec succès.'
  } catch (err) {
    error.value = err.response?.data?.message || '❌ Erreur lors de la mise à jour.'
  }
}

onMounted(() => {
  loadReservation()
})

function translateStatus(statut) {
  const statusMap = {
    'en_attente': 'En attente',
    'acceptee': 'Acceptée',
    'terminee': 'Terminée',
    'annulee': 'Annulée',
  };
  return statusMap[statut] || statut;
}

</script>
