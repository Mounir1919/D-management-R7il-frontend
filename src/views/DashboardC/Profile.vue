<template>
  <AppHeader>
    <template #default>
      <main class="main" id="top">
        <section class="pt-5 pb-9">
          <div class="container-small">
            <div class="row align-items-center justify-content-between g-3 mb-4">
              <div class="col-auto">
                <h2 class="mb-0">Profile</h2>
              </div>
              <div class="col-auto">
                <div class="row g-2 g-sm-3">
                  <div class="col-auto">
                    <router-link to="/forgot_password_client" class="btn btn-phoenix-secondary">
                      <span class="fas fa-key me-2"></span>Réinitialiser le mot de passe
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-3 mb-6">
              <div class="col-12 col-lg-8">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="border-bottom border-dashed pb-4">
                      <div class="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                        <div class="col-12 col-sm-auto">
                          <input class="d-none" id="avatarFile" type="file" @change="handlePhotoProfil" />
                          <label class="cursor-pointer avatar avatar-5xl position-relative" for="avatarFile">
                            <img class="rounded-circle" :src="avatarSrc" alt="photo profil" />

                            <!-- ✅ Icône pour changer -->
                            <span class="position-absolute bottom-0 end-0 bg-light   p-1 border"
                              style="transform: translate(25%, -25%); height: 30px; width: 30px;padding: 5px 20px 26px 6px !important;"
                              title="Changer la photo de profil">
                              <i class="fas fa-camera text-primary"></i>
                            </span>

                            <!-- ✅ Icône pour supprimer -->
                            <span class="position-absolute top-0 end-0 bg-danger p-1 border cursor-pointer"
                              style="transform: translate(25%, -25%); height: 30px; width: 30px;padding: 5px 20px 26px 8px !important;"
                              title="Supprimer la photo de profil" @click.prevent="removePhotoProfil">
                              <i class="fas fa-times text-white"></i>
                            </span>
                          </label>

                        </div>
                        <div class="col-12 col-sm-auto flex-1">
                          <h3>{{ form.nom }}</h3>
                          <p class="text-body-secondary">
                            Inscrit le {{ formattedDateInscription }}
                          </p>

                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-between-center pt-4">
                      <div>
                        <h6 class="mb-2 text-body-secondary">Type</h6>
                        <h4 class="fs-7 text-body-highlight mb-0">{{ form.type }}</h4>
                      </div>
                      <div class="text-end">
                        <h6 class="mb-2 text-body-secondary">Statut</h6>
                        <h4 class="fs-7 text-body-highlight mb-0">{{ libelleStatut }}</h4>
                      </div>
                      <div v-if="form.type === 'transporteur'" class="text-end">
                        <h6 class="mb-2 text-body-secondary">Abonnement actif</h6>
                        <h4 class="fs-7 text-body-highlight mb-0">
                          {{ form.abonnement_actif ? 'Oui' : 'Non' }}
                        </h4>
                      </div>
                      <div v-if="form.type === 'transporteur'"  class="text-end">
                        <h6 class="mb-2 text-body-secondary">Type d'abonnement</h6>
                        <h4 class="fs-7 text-body-highlight mb-0">
                          {{ libelleAbonnement   }}
                        </h4>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="border-bottom border-dashed">

                    </div>
                    <div class="pt-4 mb-7 mb-lg-4 mb-xl-7">
                      <div class="row justify-content-between">
                        <div class="col-auto">
                          <h5 class="text-body-highlight">Adresse</h5>
                        </div>
                        <div class="col-auto">
                          <p class="text-body-secondary">{{ form.adresse }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="border-top border-dashed pt-4">
                      <div class="row flex-between-center mb-2">
                        <div class="col-auto">
                          <h5 class="text-body-highlight mb-0">Email</h5>
                        </div>
                        <div class="col-auto">
                          <a class="lh-1" :href="'mailto:' + form.email">{{ form.email }}</a>
                        </div>
                      </div>
                      <div class="row flex-between-center">
                        <div class="col-auto">
                          <h5 class="text-body-highlight mb-0">Téléphone</h5>
                        </div>
                        <div class="col-auto">
                          <a :href="'tel:' + form.telephone">{{
                            form.telephone || 'Non renseigné'
                          }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Update -->
            <div class="tab-content" id="profileTabContent">
              <div class="tab-pane fade show active" id="tab-personal-info" role="tabpanel"
                aria-labelledby="personal-info-tab">
                <div class="row gx-3 gy-4 mb-5">
                  <div class="col-12 col-lg-6">
                    <label class="form-label" for="fullName">Nom et prénom</label>
                    <input class="form-control" v-model="form.nom" id="fullName" type="text" />
                  </div>
                  <div class="col-12 col-lg-6">
                    <label class="form-label">Email</label>
                    <div class="form-control bg-light">{{ form.email }}</div>
                  </div>


                  <!-- Véhicule -->
                  <div class="col-12 col-lg-6" v-if="!isClient">
                    <label class="form-label" for="vehicule">Véhicule</label>
                    <input class="form-control" v-model="form.vehicule" id="vehicule" type="text" />
                    <div v-if="form.photo_vehicule" class="mt-2">
                      <a :href="`${baseURL}/${form.photo_vehicule}`" target="_blank"
                        class="btn btn-sm btn-outline-primary">Voir photo véhicule</a>
                    </div>
                  </div>
                  <!-- Permis -->
                  <div class="col-12 col-lg-6" v-if="!isClient">
                    <label class="form-label" for="permis">Permis (image)</label>
                    <input class="form-control" id="permis" type="file" @change="handlePermis" />
                    <div v-if="form.permis" class="mt-2">
                      <a :href="`${baseURL}/${form.permis}`" target="_blank" class="btn btn-sm btn-outline-primary">Voir
                        permis</a>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6">
                    <label class="form-label" for="adresse">Adresse</label>
                    <input class="form-control" v-model="form.adresse" id="adresse" type="text" />
                  </div>
                  <div class="col-12 col-lg-6">
                    <label class="form-label" for="telephone">Téléphone</label>
                    <input class="form-control" v-model="form.telephone" id="telephone" type="text" />
                  </div>
                  <div class="col-12 col-lg-6" v-if="!isClient">
                    <label class="form-label" for="photo_vehicule">Photo Véhicule</label>
                    <input class="form-control" id="photo_vehicule" type="file" @change="handlePhotoVehicule" />
                  </div>
                  <!-- Carte Grise -->
                  <div class="col-12 col-lg-6" v-if="!isClient">
                    <label class="form-label" for="carte_grise">Carte Grise</label>
                    <input class="form-control" id="carte_grise" type="file" @change="handleCarteGrise" />
                    <div v-if="form.carte_grise" class="mt-2">
                      <a :href="`${baseURL}/${form.carte_grise}`" target="_blank"
                        class="btn btn-sm btn-outline-primary">Voir carte grise</a>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6" v-if="!isClient && form.type === 'transporteur'">
                    <label class="form-label">Date fin essai</label>
                    <input class="form-control" :value="dateFinEssaiAffichee" disabled />
                  </div>

                </div>
                <div class="text-end">
                  <button class="btn btn-primary px-7" @click="updateProfile">
                    Enregistrer les modifications
                  </button>
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
import AppHeader from '../../components/DashboardC/AppHeader.vue'
import axios from '@/axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const form = ref({
  nom: '',
  telephone: '',
  date_naissance: '',
  facebook: '',
  instagram: '',
  twitter: '',
  alternative_phone: '',
  adresse: '',
  type: '',
  vehicule: '',
  permis: '',
  photo_profil: '',
  date_inscription: '',
  statut_validation: '',
  abonnement_actif: '',
  date_fin_essai: '',
})

const initialType = ref('') // ✅ type original depuis la BDD
const previewPhotoProfil = ref('')
const error = ref('')

const photoVehiculeFile = ref(null)
const carteGriseFile = ref(null)
const photoProfilFile = ref(null)
const permisFile = ref(null)

const handlePhotoVehicule = (e) => {
  photoVehiculeFile.value = e.target.files[0]
}

const handleCarteGrise = (e) => {
  carteGriseFile.value = e.target.files[0]
}

const handlePermis = (e) => {
  permisFile.value = e.target.files[0]
}

const avatarSrc = computed(() => {
  if (previewPhotoProfil.value) return previewPhotoProfil.value
  if (form.value.photo_profil) return `${baseURL}/${form.value.photo_profil}`
  return '/avatar.png' // ✔️ fallback par défaut
})

const removePhotoProfil = async () => {
  try {
    const response = await axios.post('/transporteur/delete_photo_profil')
    form.value.photo_profil = ''
    previewPhotoProfil.value = ''
    photoProfilFile.value = null
    alert(response.data.message || '✅ Photo supprimée avec succès')
  } catch (err) {
    console.error(err)
    alert('❌ Une erreur est survenue lors de la suppression.')
  }
}

const handlePhotoProfil = (e) => {
  const file = e.target.files[0]
  photoProfilFile.value = file
  if (file) {
    previewPhotoProfil.value = URL.createObjectURL(file)
  }
}

// ✅ Détection correcte basée sur la base de données
const isClient = computed(() => initialType.value === 'client')

const updateProfile = async () => {
  try {
    const formData = new FormData()

    for (const key in form.value) {
      if (key !== 'photo_profil' && key !== 'date_inscription') {
        // Evite d’envoyer 'null' ou 'undefined' en string
        let value = form.value[key]
        if (value === null || value === undefined || value === 'null' || value === 'undefined') {
          value = ''
        }
        formData.append(key, value)
      }
    }

    if (photoVehiculeFile.value) formData.append('photo_vehicule', photoVehiculeFile.value)
    if (carteGriseFile.value) formData.append('carte_grise', carteGriseFile.value)
    if (photoProfilFile.value) formData.append('photo_profil', photoProfilFile.value)
    if (permisFile.value) formData.append('permis', permisFile.value)

    const res = await axios.post('/transporteur/update_profil', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    alert(res.data.message)

    // Recharge systématique après la mise à jour
    window.location.reload()

  } catch (err) {
    console.error(err)
    alert('❌ Erreur lors de la mise à jour.')
  }
}

const formattedDateInscription = computed(() => {
  if (!form.value.date_inscription) return 'Non disponible'
  return new Date(form.value.date_inscription).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})

const getProfile = async () => {
  try {
    const res = await axios.get('/transporteur/profil_client')
    form.value = res.data
    initialType.value = res.data.type // ✅ valeur fixe depuis base
    console.log('✅ Photo profil chargée :', form.value.photo_profil)
  } catch (err) {
    error.value = 'Accès refusé ou session expirée.'
    logout()
  }
}

const logout = () => {
  localStorage.removeItem('transporteur_token')
  window.location.href = '/login_client'
}

onMounted(async () => {
  await getProfile()
})

// ✅ Date formatée + libellé d’abonnement si actif
const dateFinEssaiAffichee = computed(() => {
  const abonnement = form.value.abonnement_actif
  const dateInscription = form.value.date_inscription

  if (abonnement && dateInscription) {
    const dateDebut = new Date(dateInscription)

    // Ajouter durée selon abonnement
    switch (abonnement) {
      case 'free_14_days':
        dateDebut.setDate(dateDebut.getDate() + 14)
        break
      case 'pack_1_month':
        dateDebut.setMonth(dateDebut.getMonth() + 1)
        break
      case 'pack_6_months':
        dateDebut.setMonth(dateDebut.getMonth() + 6)
        break
      case 'pack_1_year':
        dateDebut.setFullYear(dateDebut.getFullYear() + 1)
        break
      default:
        return 'Non disponible'
    }

    const dateFormatee = dateDebut.toLocaleDateString('fr-FR')

    // Libellé selon abonnement
    const libelles = {
      free_14_days: ' (14 jours gratuits)',
      pack_1_month: ' (1 mois)',
      pack_6_months: ' (6 mois)',
      pack_1_year: ' (1 an)',
    }

    const libelle = libelles[abonnement] || ''
    return `${dateFormatee}${libelle}`
  }

  return 'Non disponible'
})

const libelleAbonnement = computed(() => {
  const mapping = {
    en_attente: 'Abonnement en attente',
    free_14_days: 'Pack 14 jours gratuits',
    pack_1_month: 'Pack 1 mois',
    pack_6_months: 'Pack 6 mois',
    pack_1_year: 'Pack 1 an',
  }

  return mapping[form.value.abonnement_actif] || 'Non défini'
})

const libelleStatut = computed(() => {
  const mapping = {
    en_attente: 'En attente',
    valide: 'Validé',
    refuse: 'Refusé',
    // ajoute d'autres statuts si besoin
  }
  return mapping[form.value.statut_validation] || form.value.statut_validation || 'Non défini'
})
</script>
