<template>
  <AppHeader>
    <template #default>
      <div class="p-3 max-w-4xl mx-auto">
        <h2 class="mb-4">📋 Mes Réservations</h2>

        <div v-if="isLoading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status" aria-label="Loading">
            <span class="visually-hidden">Chargement des réservations...</span>
          </div>
        </div>

        <div v-else>
          <div class="search-box mb-3 mx-auto" style="max-width: 400px;">
            <input v-model="searchTerm" type="search" class="form-control form-control-sm" placeholder="Rechercher..."
              aria-label="Search" />
          </div>

          <div class="table-responsive">
            <table class="table table-striped table-sm fs-9 mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Départ</th>
                  <th>Arrivée</th>
                  <th>Surface</th>
                  <th>Statut</th>
                  <th class="text-end pe-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in pagedReservations" :key="res.id">
                  <td>{{ formatDate(res.date_heure) }}</td>
                  <td>{{ res.adresse_depart }}, {{ res.ville_depart }}</td>
                  <td>{{ res.adresse_arrivee }}, {{ res.ville_arrivee }}</td>
                  <td>{{ res.surface }} m²</td>
                  <td>
                    <span :class="badgeClass(res.statut)">
                      {{ translateStatus(res.statut) }}
                    </span>
                  </td>
                  <td class="text-end pe-3">
                    <div class="dropdown">
                      <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Actions
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" :href="`/edit_reservation/${res.id}`">Modifier</a></li>
                        <div v-if="res.statut === 'en_attente'">
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <!-- Partie template : -->
                          <li>
                            <a class="dropdown-item text-danger" href="#" @click.prevent="deleteReservation(res.id)">
                              Supprimer
                            </a>
                          </li>
                        </div>

                      </ul>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredReservations.length === 0">
                  <td colspan="6" class="text-center text-muted">Aucune réservation trouvée.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation" class="mt-3 d-flex justify-content-between align-items-center">
            <div>
              <small>
                Affichage {{ startItem + 1 }} à
                {{ endItem }} sur {{ filteredReservations.length }} réservations
              </small>
            </div>

            <ul class="pagination mb-0">
              <li :class="['page-item', { disabled: currentPage === 1 }]">
                <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
                  &laquo;
                </button>
              </li>

              <li v-for="page in totalPages" :key="page" :class="['page-item', { active: page === currentPage }]">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>

              <li :class="['page-item', { disabled: currentPage === totalPages }]">
                <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
                  &raquo;
                </button>
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

const currentPage = ref(1)
const perPage = 5

onMounted(async () => {
  try {
    const token = localStorage.getItem('transporteur_token')
    if (!token) throw new Error('Non connecté')

    const res = await axios.get('/reservations/client/all')
    reservations.value = res.data
  } catch (e) {
    console.error('Erreur chargement des réservations:', e)
    reservations.value = []
  } finally {
    isLoading.value = false
  }
})

const filteredReservations = computed(() => {
  if (!searchTerm.value.trim()) return reservations.value

  const term = searchTerm.value.toLowerCase()
  return reservations.value.filter(
    (r) =>
      r.adresse_depart.toLowerCase().includes(term) ||
      r.ville_depart.toLowerCase().includes(term) ||
      r.adresse_arrivee.toLowerCase().includes(term) ||
      r.ville_arrivee.toLowerCase().includes(term) ||
      r.statut.toLowerCase().includes(term)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredReservations.value.length / perPage)
)

const pagedReservations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredReservations.value.slice(start, start + perPage)
})

const startItem = computed(() => (filteredReservations.value.length === 0 ? 0 : (currentPage.value - 1) * perPage))
const endItem = computed(() =>
  Math.min(currentPage.value * perPage, filteredReservations.value.length)
)

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

function translateStatus(statut) {
  const statusMap = {
    'en_attente': 'En attente',
    'acceptee': 'Acceptée',
    'terminee': 'Terminée',
    'annulee': 'Annulée',
  };
  return statusMap[statut] || statut;
}



function badgeClass(statut) {
  switch (statut) {
    case 'en_attente':
      return 'badge bg-warning text-dark';
    case 'acceptee':
      return 'badge bg-success';
    case 'terminee':
      return 'badge bg-secondary';
    default:
      return 'badge bg-danger';
  }
}

// Nouvelle méthode pour suppression
async function deleteReservation(id) {
  if (!confirm('Voulez-vous vraiment supprimer cette réservation ?')) return

  try {
    await axios.delete(`/reservation/client/destroy/${id}`)
    // Retirer de la liste localement pour reactivité immédiate
    reservations.value = reservations.value.filter(r => r.id !== id)
  } catch (err) {
    alert('Erreur lors de la suppression : ' + (err.response?.data?.message || err.message))
  }
}
</script>


<style scoped>
/* Optional: adjust font size to match your example */
.fs-9 {
  font-size: 0.9rem;
}

/* Make the search icon position if you want, or add your own styles */

.search-box input {
  padding-right: 2.5rem;
}

.table-responsive {
  overflow: visible !important;
  position: static;
  /* allow dropdown to escape clipping */
}

/* You can add more custom styles here */
</style>
