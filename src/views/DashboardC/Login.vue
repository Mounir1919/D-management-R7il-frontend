<template>
  <main class="main" id="top">
    <div class="container-fluid bg-body-tertiary dark__bg-gray-1200">
      <div
        class="bg-holder bg-auth-card-overlay"
        style="background-image: url(../../../assets/img/bg/37.png)"
      ></div>
      <div class="row flex-center position-relative min-vh-100 g-0 py-5">
        <div class="col-11 col-sm-10 col-xl-8">
          <div class="card border border-translucent auth-card">
            <div class="card-body pe-md-0">
              <div class="row align-items-center gx-0 gy-7">

                <!-- Illustration -->
                <div class="col-auto bg-body-highlight dark__bg-gray-1100 rounded-3 position-relative overflow-hidden auth-title-box">
                  <div class="bg-holder" style="background-image: url(../../../assets/img/bg/38.png)"></div>
                  <div class="position-relative px-4 px-lg-7 pt-7 pb-7 text-center text-md-start">
                    <h3 class="mb-3 text-body-emphasis fs-7">R7il Authentication</h3>
                    <ul class="list-unstyled mb-0">
                      <li class="d-flex align-items-center">
                        <span class="uil uil-check-circle text-success me-2"></span>
                        <span class="text-body-tertiary fw-semibold">Rapide</span>
                      </li>
                      <li class="d-flex align-items-center">
                        <span class="uil uil-check-circle text-success me-2"></span>
                        <span class="text-body-tertiary fw-semibold">Simple</span>
                      </li>
                      <li class="d-flex align-items-center">
                        <span class="uil uil-check-circle text-success me-2"></span>
                        <span class="text-body-tertiary fw-semibold">Sensible</span>
                      </li>
                    </ul>
                  </div>
                  <div class="position-relative text-center d-none d-md-block">
                    <img class="auth-title-box-img d-dark-none" src="../../../assets/img/spot-illustrations/auth.png" alt="" />
                    <img class="auth-title-box-img d-light-none" src="../../../assets/img/spot-illustrations/auth-dark.png" alt="" />
                  </div>
                </div>

                <!-- Formulaire de connexion -->
                <div class="col mx-auto">
                  <div class="auth-form-box">
                    <div class="text-center mb-7">
                      <a class="d-flex flex-center text-decoration-none mb-4" href="/">
                        <img src="/template/images/33.png" alt="phoenix" width="58" />
                      </a>
                      <h3 class="text-body-highlight">Se connecter</h3>
                      <p class="text-body-tertiary">Accédez à votre compte</p>
                    </div>

                    <!-- Message de succès -->
                    <div v-if="success" class="alert alert-success mt-3">
                      {{ success }}
                    </div>

                    <!-- Erreur -->
                    <div v-if="error" class="alert alert-danger mt-3">
                      {{ error }}
                    </div>

                    <!-- Connexion Google -->
                    <button @click="googleLoginClient" class="btn btn-outline-primary w-100 mb-3">
                      <span class="fab fa-google text-danger me-2 fs-9"></span>Connexion Google Client
                    </button>
                    <button @click="googleLoginTransporteur" class="btn btn-outline-primary w-100 mb-3">
                      <span class="fab fa-google text-danger me-2 fs-9"></span>Connexion Google Transporteur
                    </button>

                    <div class="position-relative">
                      <hr class="bg-body-secondary mt-5 mb-4" />
                      <div class="divider-content-center bg-body-emphasis">
                        Ou utiliser le courrier électronique
                      </div>
                    </div>

                    <form @submit.prevent="handleLogin">
                      <div class="mb-3 text-start">
                        <label class="form-label" for="email">Adresse email</label>
                        <div class="form-icon-container">
                          <input class="form-control form-icon-input" id="email" v-model="form.email" type="email" placeholder="name@example.com" required />
                          <span class="fas fa-user text-body fs-9 form-icon"></span>
                        </div>
                      </div>

                      <div class="mb-3 text-start">
                        <label class="form-label" for="password">Mot de passe</label>
                        <div class="form-icon-container">
                          <input class="form-control form-icon-input pe-6" id="password" v-model="form.password" type="password" placeholder="Mot de passe" required />
                          <span class="fas fa-key text-body fs-9 form-icon"></span>
                        </div>
                      </div>

                      <div class="row flex-between-center mb-7">
                        <div class="col-auto">
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="basic-checkbox" v-model="remember" />
                            <label class="form-check-label mb-0" for="basic-checkbox">Souviens-toi de moi</label>
                          </div>
                        </div>
                        <div class="col-auto">
<router-link class="fs-9 fw-semibold" to="/forgot_password_client">Mot de passe oublié ?</router-link>
                        </div>
                      </div>

                      <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
                        {{ loading ? 'Connexion...' : 'Se connecter' }}
                      </button>
                    </form>

                    <div class="text-center">
                      <router-link to="/register_client" class="fs-9 fw-bold">Créer un compte</router-link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

defineOptions({
  name: 'LoginClient'
})

import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  email: '',
  password: '',
})
const remember = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

// 🔄 Rediriger si déjà connecté
onMounted(() => {
  const token = localStorage.getItem('transporteur_token')
  if (token) {
    window.location.href = '/dashboard_client'
  }

  const urlParams = new URLSearchParams(window.location.search)
  const errorParam = urlParams.get('error')
  const messageParam = urlParams.get('message')
  const verifiedParam = urlParams.get('verified')

  if (messageParam) {
    error.value = decodeURIComponent(messageParam)
  } else if (errorParam === 'already_registered_as_client') {
    error.value = "Vous êtes déjà inscrit comme client. Veuillez utiliser le bouton 'Connexion Google Client'."
  } else if (errorParam === 'already_registered_as_transporteur') {
    error.value = "Vous êtes déjà inscrit comme transporteur. Veuillez utiliser le bouton 'Connexion Google Transporteur'."
  } else if (errorParam === 'google_exception') {
    error.value = 'Une erreur est survenue lors de la connexion avec Google.'
  }

  if (verifiedParam === '1') {
    success.value = '✅ Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter.'
  }
})

// 🔐 Connexion par email (transporteur)
const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/transporteur/login_client', {
      email: form.value.email,
      password: form.value.password,
    })
    const token = response.data.token
    localStorage.setItem('transporteur_token', token)
    window.location.href = '/dashboard_client'
  } catch (err) {
    error.value = err.response?.data?.message || 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}

// 🔐 Connexion Google CLIENT
const googleLoginClient = () => {
  window.location.href = 'http://127.0.0.1:8000/api/client/redirect'
}

// 🔐 Connexion Google TRANSPORTEUR
const googleLoginTransporteur = () => {
  window.location.href = 'http://127.0.0.1:8000/api/transporteur/redirect'
}
</script>
