<template>
  <AppHeader>
    <template #default>
      <div class="p-3 max-w-4xl mx-auto">
        <h2 class="mb-4">📜 Historique des Réservations</h2>

        <div v-if="isLoading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status" aria-label="Loading">
            <span class="visually-hidden">Chargement de l'historique...</span>
          </div>
        </div>

        <div v-else>
          <div class="search-box mb-3 mx-auto" style="max-width: 400px;">
            <input v-model="searchTerm" type="search" class="form-control form-control-sm" placeholder="Rechercher dans l'historique..." />
          </div>

          <div class="table-responsive">
            <table class="table table-striped table-sm fs-9 mb-0">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Départ</th>
                  <th>Arrivée</th>
                  <th>Surface</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in pagedReservations" :key="res.id">
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <img
                        :src="res.client?.photo_profil ? `${baseURL}/${res.client.photo_profil}` : '/avatar.png'"
                        class="rounded-circle"
                        style="width: 32px; height: 32px; object-fit: cover;"
                        alt="Client"
                      />
                      <span>{{ res.client?.nom || 'Inconnu' }}</span>
                    </div>
                  </td>
                  <td>{{ formatDate(res.date_heure) }}</td>
                  <td>{{ res.adresse_depart }}, {{ res.ville_depart }}</td>
                  <td>{{ res.adresse_arrivee }}, {{ res.ville_arrivee }}</td>
                  <td>{{ res.surface }} m²</td>
        <td>
<select
  v-model="res.statut"
  @change="updateStatut(res.id, res.statut)"
  class="form-select form-select-sm"
  :disabled="res.statut === 'terminee' || res.statut === 'annulee'"
  style="width: auto; min-width: 120px; cursor: pointer; color:black !important"
>
  <option value="acceptee">Acceptée</option>
  <option value="terminee">Terminée</option>
  <option value="annulee">Annulée</option>
</select>

</td>


                </tr>
                <tr v-if="filteredReservations.length === 0">
                  <td colspan="6" class="text-center text-muted">Aucune réservation trouvée dans l'historique.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav class="mt-3 d-flex justify-content-between align-items-center">
            <div>
              <small>
                Affichage {{ startItem + 1 }} à {{ endItem }} sur {{ filteredReservations.length }} réservations
              </small>
            </div>

            <ul class="pagination mb-0">
              <li :class="['page-item', { disabled: currentPage === 1 }]">
                <button class="page-link" @click="changePage(currentPage - 1)">&laquo;</button>
              </li>
              <li v-for="page in totalPages" :key="page" :class="['page-item', { active: currentPage === page }]">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li :class="['page-item', { disabled: currentPage === totalPages }]">
                <button class="page-link" @click="changePage(currentPage + 1)">&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </template>
  </AppHeader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/axios'
import AppHeader from '../../components/DashboardC/AppHeader.vue'

const reservations = ref([])
const isLoading = ref(true)
const searchTerm = ref('')
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const currentPage = ref(1)
const perPage = 5

onMounted(async () => {
  try {
    const token = localStorage.getItem('transporteur_token')
    if (!token) throw new Error('Non connecté')

    const res = await axios.get('/transporteur/reservations/historique', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    reservations.value = res.data.reservations
  } catch (e) {
    console.error("Erreur chargement de l'historique des réservations:", e)
    reservations.value = []
  } finally {
    isLoading.value = false
  }
})

const filteredReservations = computed(() => {
  if (!searchTerm.value.trim()) return reservations.value

  const term = searchTerm.value.toLowerCase()
  return reservations.value.filter(
    r =>
      r.adresse_depart?.toLowerCase().includes(term) ||
      r.ville_depart?.toLowerCase().includes(term) ||
      r.adresse_arrivee?.toLowerCase().includes(term) ||
      r.ville_arrivee?.toLowerCase().includes(term) ||
      r.statut?.toLowerCase().includes(term) ||
      r.client?.nom?.toLowerCase().includes(term)
  )
})

const totalPages = computed(() => Math.ceil(filteredReservations.value.length / perPage))

const pagedReservations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredReservations.value.slice(start, start + perPage)
})

const startItem = computed(() => (filteredReservations.value.length === 0 ? 0 : (currentPage.value - 1) * perPage))
const endItem = computed(() => Math.min(currentPage.value * perPage, filteredReservations.value.length))

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

async function updateStatut(id, nouveauStatut) {
  try {
    const token = localStorage.getItem('transporteur_token')
    if (!token) throw new Error('Non connecté')

    const response = await axios.put(
      `/transporteur/historique/${id}`,
      { statut: nouveauStatut },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    alert(response.data.message)
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert(error.response.data.message)
    } else {
      alert('Erreur lors de la mise à jour du statut.')
    }
    console.error(error)
  }
}





</script>

<style scoped>
.fs-9 {
  font-size: 0.9rem;
}

.search-box input {
  padding-right: 2.5rem;
}

.table-responsive {
  overflow: visible !important;
  position: static;
}


</style>
