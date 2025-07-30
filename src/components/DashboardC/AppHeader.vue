<template>
  <main class="main" id="top">
    <nav class="navbar navbar-vertical navbar-expand-lg" style="display: none">
      <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
        <!-- scrollbar removed-->
        <div class="navbar-vertical-content">
          <ul class="navbar-nav flex-column" id="navbarVerticalNav">
            <li class="nav-item">
              <!-- parent pages-->
              <div class="nav-item-wrapper">
                <a class="nav-link label-1" href="/dashboard_client" role="button" data-bs-toggle=""
                  aria-expanded="false">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-icon"><span data-feather="pie-chart"></span></span>

                    <span class="nav-link-text-wrapper"><span class="nav-link-text">Dashboard</span></span>
                  </div>
                </a>
              </div>
            </li>



<li class="nav-item">
  <!-- parent pages -->
  <div class="nav-item-wrapper">
    <a class="nav-link label-1" href="/" role="button">
      <div class="d-flex align-items-center">
        <span class="nav-link-icon"><span data-feather="home"></span></span>
        <span class="nav-link-text-wrapper"><span class="nav-link-text">Accéder au site</span></span>
      </div>
    </a>
  </div>
</li>


            <li v-if="user && user.type === 'client'" class="nav-item">
              <div class="nav-item-wrapper">
                <a class="nav-link label-1" href="/reservations" role="button">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-icon"><span data-feather="calendar"></span></span>
                    <span class="nav-link-text-wrapper"><span class="nav-link-text">Mes Réservations</span></span>
                  </div>
                </a>
              </div>
            </li>
            <li v-else class="nav-item">
              <div class="nav-item-wrapper">
                <a class="nav-link label-1" href="/notifications" role="button">
                  <div class="d-flex align-items-center">
                    <span class="nav-link-icon"><span data-feather="calendar"></span></span>
                    <span class="nav-link-text-wrapper"><span class="nav-link-text">Mes Notifications</span></span>
                  </div>
                </a>
              </div>
            </li>

            <li v-if="user && user.type === 'transporteur'" class="nav-item">
  <!-- parent pages-->
  <div class="nav-item-wrapper">
    <a class="nav-link label-1" href="/historique-reservations" role="button">
      <div class="d-flex align-items-center">
        <span class="nav-link-icon"><span data-feather="clock"></span></span>
        <span class="nav-link-text-wrapper">
          <span class="nav-link-text">Historique des réservations</span>
        </span>
      </div>
    </a>
  </div>
</li>


          </ul>
        </div>
      </div>
      <div class="navbar-vertical-footer">
        <button
          class="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
          <span class="uil uil-left-arrow-to-left fs-8"></span>
          <span class="uil uil-arrow-from-right fs-8"></span>
          <span class="navbar-vertical-footer-text ms-2">Collapsed View</span>
        </button>
      </div>
    </nav>
    <nav class="navbar navbar-top fixed-top navbar-expand" id="navbarDefault" style="display: none">
      <div class="collapse navbar-collapse justify-content-between">
        <div class="navbar-logo">
          <button class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse"
            aria-expanded="false" aria-label="Toggle Navigation">
            <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
          </button>
          <a class="navbar-brand me-1 me-sm-3" href="index-1.html">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <img src="/assets/img/icons/logo.png" alt="phoenix" width="27" />
                <h5 class="logo-text ms-2 d-none d-sm-block">phoenix</h5>
              </div>
            </div>
          </a>
        </div>

        <ul class="navbar-nav navbar-nav-icons flex-row">
          <li class="nav-item">
            <div class="theme-control-toggle fa-icon-wait px-2">
              <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox"
                data-theme-control="phoenixTheme" value="dark" id="themeControlToggle" />
              <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle"
                data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme"
                style="height: 32px; width: 32px">
                <span class="icon" data-feather="moon"></span>
              </label>
              <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle"
                data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme"
                style="height: 32px; width: 32px">
                <span class="icon" data-feather="sun"></span>
              </label>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link position-relative" href="#" style="min-width: 2.25rem" role="button"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-auto-close="outside">
              <span class="d-block" style="height: 20px; width: 20px">
                <span data-feather="bell" style="height: 20px; width: 20px"></span>
              </span>

              <!-- Badge rouge toujours visible avec nombre, ou 0 -->
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white"
                style="margin:7px -24px 0px -7px;width: 18px; height: 18px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; padding: 0;">
                {{ unreadCount }}
              </span>

            </a>

            <div
              class="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border navbar-dropdown-caret"
              id="navbarDropdownNotfication" aria-labelledby="navbarDropdownNotfication">
              <div class="card position-relative border-0" style="min-width: 320px; max-width: 400px;">
                <!-- <div class="card-header p-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="text-body-emphasis mb-0">Notifications</h5>
                    <button class="btn btn-link p-0 fs-9 fw-normal" type="button" @click="markAllAsRead">
                      Marquer tout comme lu
                    </button>
                  </div>
                </div> -->
                <div class="card-body p-0">
                  <div class="scrollbar-overlay" style="height: 27rem; overflow-y: auto;">
                    <div v-if="loadingNotifications" class="text-center p-3">Chargement...</div>
                    <div v-else-if="notifications.length === 0" class="text-center p-3 text-danger fw-bold">
                      Aucune notification.
                    </div>

                    <div v-else v-for="notif in notifications" :key="notif.id"
                      class="px-3 py-2 border-bottom d-flex align-items-start" style="gap: 10px;">
                      <img class="rounded-circle"
                        :src="notif.data.client_photo ? `${baseURL}/${notif.data.client_photo}` : '/avatar.png'"
                        alt="Photo client" style="width: 40px; height: 40px; object-fit: cover;" />

                      <div class="flex-grow-1">
                        <div class="fs-8 text-body-secondary">
                          📦 {{ notif.data.message }}
                        </div>
                        <div class="fs-8 text-muted mt-1" style="font-family: monospace;">
                          {{ formatDateTimeWithSeconds(notif.created_at) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer p-2 border-top border-translucent text-center fs-8">
                  <a href="/historique-reservations" class="fw-bold text-decoration-none">
                    Historique des notifications
                  </a>
                </div>
              </div>
            </div>
          </li>


          <li class="nav-item dropdown">
            <a class="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button" data-bs-toggle="dropdown"
              data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
              <div class="avatar avatar-l">
                <input type="file" id="avatarUpload" class="d-none" @change="handlePhotoProfil" />
                <label class="cursor-pointer avatar avatar-l" for="avatarUpload">
                  <img class="rounded-circle" :src="previewPhotoProfil || photoProfilUrl" alt="Photo de profil" />
                </label>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border"
              aria-labelledby="navbarDropdownUser">
              <div class="card position-relative border-0">
                <div class="card-body p-0">
                  <div v-if="user" class="text-center pt-4 pb-3">
                    <div class="avatar avatar-xl">
                      <input type="file" id="avatarUpload" class="d-none" @change="handlePhotoProfil" />
                      <label class="cursor-pointer avatar avatar-l" for="avatarUpload">
                        <img class="rounded-circle" :src="previewPhotoProfil || photoProfilUrl" alt="Photo de profil" />
                      </label>
                    </div>
                    <h6 class="mt-2 text-body-emphasis">{{ user.nom }}</h6>
                  </div>
                  <div class="mb-3 mx-3" v-if="user">
                    <select class="form-select form-select-sm" v-model="user.status" @change="updateStatus">
                      <option value="disponible">Disponible</option>
                      <option value="indisponible">Indisponible</option>
                    </select>

                    <div v-if="statusMessage" class="alert alert-success mt-2 p-2 py-1">
                      {{ statusMessage }}
                    </div>
                  </div>

                </div>
                <div class="overflow-auto scrollbar" style="height: 10rem">
                  <ul class="nav d-flex flex-column mb-2 pb-1">
                    <li class="nav-item">
                      <a class="nav-link px-3 d-block" href="/edit_client" @click.prevent="reloadprofile">
                        <span class="me-2 text-body align-bottom" data-feather="user"></span>
                        <span>Profile</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="/" class="nav-link px-3 d-block">
                        <span class="nav-link-icon"><span data-feather="home"></span></span>
                        Accéder au site
                      </a>
                    </li>


                  </ul>
                </div>

                <hr />
                <div class="px-3">
                  <a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#" @click="logout_client">
                    <span class="me-2" data-feather="log-out"></span>
                    Se Déconnecter
                  </a>

                </div> <br> <br>


              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="content">
      <slot />
      <footer class="footer position-absolute">
        <div class="row g-0 justify-content-between align-items-center h-100">
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 mt-2 mt-sm-0 text-body">
              Site créé avec passion par <strong><a href="/" @click.prevent="reloadHome">R7il</a></strong>
              <span class="d-none d-sm-inline-block mx-1">|</span>
              &copy; 2025
            </p>
          </div>

        </div>
      </footer>

    </div>


  </main>
</template>
<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from '@/axios'

const user = ref(null)
const error = ref('')
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const statusMessage = ref('')

const notifications = ref([])
const loadingNotifications = ref(false)

// Calcul du nombre de notifications non lues (affiché en badge)
const unreadCount = computed(() => notifications.value.length)

// Récupérer les notifications du transporteur connecté
const fetchNotifications = async () => {
  loadingNotifications.value = true
  try {
    const res = await axios.get('/transporteur/notifications')
    notifications.value = res.data
  } catch (err) {
    console.error('Erreur récupération notifications :', err)
  } finally {
    loadingNotifications.value = false
  }
}

// Marquer toutes les notifications comme lues (appel API)
const markAllAsRead = async () => {
  try {
    await axios.post('/transporteur/notifications/read-all')
    notifications.value = []
  } catch (err) {
    console.error('Erreur marquage notifications :', err)
  }
}

// URL de la photo de profil utilisateur
const photoProfilUrl = computed(() => {
  return user.value?.photo_profil ? `${baseURL}/${user.value.photo_profil}` : '/avatar.png'
})


const formatDateTimeWithSeconds = (dateStr) => {
  const date = new Date(dateStr)
  const pad = (n) => n.toString().padStart(2, '0')
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()
  const hour = pad(date.getHours())
  const minute = pad(date.getMinutes())
  const second = pad(date.getSeconds())
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}



// Mise à jour des icônes Feather après DOM
const updateFeatherIcons = () => {
  nextTick(() => {
    if (window.feather) window.feather.replace()
  })
}

// Mise à jour du statut utilisateur (exemple)
const updateStatus = async () => {
  try {
    await axios.post('/transporteur/update_status', {
      status: user.value.status,
    })
    statusMessage.value = 'Statut mis à jour avec succès !'
    setTimeout(() => (statusMessage.value = ''), 3000)
  } catch (err) {
    console.error('Erreur mise à jour statut :', err)
    statusMessage.value = 'Erreur lors de la mise à jour du statut.'
    setTimeout(() => (statusMessage.value = ''), 3000)
  }
}

const reloadHome = () => window.location.href = '/'
const reloadprofile = () => window.location.href = '/edit_client'

// Déconnexion utilisateur
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

// Chargement initial : profil + notifications + Feather
onMounted(async () => {
  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data
    await fetchNotifications()  // attendre que les notif soient chargées
    updateFeatherIcons()
  } catch (err) {
    error.value = 'Session expirée. Veuillez vous reconnecter.'
    localStorage.removeItem('transporteur_token')
    setTimeout(() => {
      window.location.href = '/login_client'
    }, 1500)
  }
})


// Relance Feather si user change
watch(user, () => {
  if (user.value) updateFeatherIcons()
})
</script>
