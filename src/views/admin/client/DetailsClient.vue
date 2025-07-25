<template>
  <AppHeader>
    <main class="main" id="top">
      <div class="mb-9">
        <div class="row align-items-center justify-content-between g-3 mb-4">
          <div class="col-auto">
            <h2 class="mb-0">Détails du client</h2>
          </div>
          <div class="col-auto">
            <div class="row g-3">
              <div class="col-auto">
                <button class="btn btn-phoenix-danger">
                  <span class="fa-solid fa-trash-can me-2"></span>Supprimer
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-phoenix-secondary">
                  <span class="fas fa-key me-2"></span>Réinitialiser le mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="client" class="row g-5">
          <div class="col-12 col-xxl-4">
            <div class="row g-3 h-100">
              <div class="col-12 col-md-7 col-xxl-12">
                <div class="card h-100 h-xxl-auto">
                  <div class="card-body d-flex flex-column justify-content-between pb-3">
                    <div class="row align-items-center g-5 mb-3 text-center text-sm-start">
                      <div class="col-12 col-sm-auto mb-sm-2">
                        <div class="avatar avatar-5xl">
                          <img
                            class="rounded-circle"
                            :src="
                              client.photo_profil
                                ? `http://127.0.0.1:8000/${client.photo_profil}`
                                : '/assets/img/team/avatar.webp'
                            "
                            alt="Photo de profil"
                            width="100"
                            height="100"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-sm-auto flex-1">
                        <h3>{{ client.nom }}</h3>
                        <p class="text-body-secondary">
                          Inscrit le {{ formatDate(client.date_inscription) }}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex flex-between-center border-top border-dashed pt-4">
                      <div>
                        <h6>Statut</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.status }}</p>
                      </div>
                      <div>
                        <h6>Validation</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.statut_validation }}</p>
                      </div>
                      <div>
                        <h6>ID</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.id }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-5 col-xxl-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                      <h3 class="me-1">Adresse</h3>
                      <button class="btn btn-link p-0">
                        <span class="fas fa-pen fs-8 ms-3 text-body-quaternary"></span>
                      </button>
                    </div>
                    <h5 class="text-body-secondary">Adresse complète</h5>
                    <p class="text-body-secondary">{{ client.adresse }}</p>

                    <div class="mb-3">
                      <h5 class="text-body-secondary">Email</h5>
                      <a :href="`mailto:${client.email}`">{{ client.email }}</a>
                    </div>

                    <h5 class="text-body-secondary">Téléphone</h5>
                    <a class="text-body-secondary" :href="`tel:${client.telephone}`">{{
                      client.telephone
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Chargement des détails du client...</p>
        </div>

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
const clientId = route.params.id
const client = ref(null)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients/${clientId}`)
    client.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement du client :', error)
  }
})
</script>
