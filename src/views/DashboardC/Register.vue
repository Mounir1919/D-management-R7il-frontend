<template>
  <main class="main" id="top">
    <div class="container-fluid bg-body-tertiary dark__bg-gray-1200">
      <div class="bg-holder bg-auth-card-overlay" style="background-image: url(../../../assets/img/bg/37.png)"></div>
      <div class="row flex-center position-relative min-vh-100 g-0 py-5">
        <div class="col-11 col-sm-10 col-xl-8">
          <div class="card border border-translucent auth-card">
            <div class="card-body pe-md-0">
              <div class="row align-items-center gx-0 gy-7">
                <!-- Illustration Gauche -->
                <div
                  class="col-auto bg-body-highlight dark__bg-gray-1100 rounded-3 position-relative overflow-hidden auth-title-box">
                  <div class="bg-holder" style="background-image: url(../../../assets/img/bg/38.png)"></div>
                  <div class="position-relative px-4 px-lg-7 pt-7 pb-7 text-center text-md-start">
                    <h3 class="mb-3 text-body-emphasis fs-7">Authentification R7il</h3>
                    <p class="text-body-tertiary">
                      Profitez d’un processus de développement sans tracas grâce à Phoenix !
                    </p>
                    <ul class="list-unstyled mb-0 w-max-content w-md-auto">
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
                        <span class="text-body-tertiary fw-semibold">Responsive</span>
                      </li>
                    </ul>
                  </div>
                  <div class="position-relative z-n1 mb-6 d-none d-md-block text-center mt-md-15">
                    <img class="auth-title-box-img d-dark-none" src="../../../assets/img/spot-illustrations/auth.png"
                      alt="" />
                    <img class="auth-title-box-img d-light-none"
                      src="../../../assets/img/spot-illustrations/auth-dark.png" alt="" />
                  </div>
                </div>

                <!-- Formulaire d'inscription -->
                <div class="col mx-auto">
                  <div class="auth-form-box">
                    <div class="text-center mb-7">
                      <a class="d-flex flex-center text-decoration-none mb-4" href="/">
                        <img src="/template/images/33.png" alt="logo" width="58" />
                      </a>
                      <h3 class="text-body-highlight">Créer un compte</h3>
                      <p class="text-body-tertiary">Créez votre compte dès aujourd’hui</p>
                    </div>

                    <!-- Erreur / Succès -->
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <div v-if="success" class="alert alert-success">{{ success }}</div>

                    <form @submit.prevent="handleRegister">
                      <div class="mb-3 text-start">
                        <label class="form-label" for="name">Nom</label>
                        <input class="form-control" id="name" type="text" placeholder="Nom" v-model="form.nom"
                          required />
                      </div>

                      <div class="mb-3 text-start">
                        <label class="form-label" for="email">Adresse e-mail</label>
                        <input class="form-control" id="email" type="email" placeholder="nom@exemple.com"
                          v-model="form.email" required />
                      </div>

                      <div class="row g-3 mb-3">
                        <div class="col-sm-6">
                          <label class="form-label" for="password">Mot de passe</label>
                          <input class="form-control form-icon-input pe-6" id="password" type="password"
                            placeholder="Mot de passe" v-model="form.password" required />
                        </div>

                        <div class="col-sm-6">
                          <label class="form-label" for="confirmPassword">Confirmer le mot de passe</label>
                          <input class="form-control form-icon-input pe-6" id="confirmPassword" type="password"
                            placeholder="Confirmer le mot de passe" v-model="form.confirmPassword" required />
                        </div>
                      </div>
                      <!-- Choix du type -->
                      <div class="mb-3 text-start">
                        <label class="form-label">Vous êtes :</label>
                        <div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="client" value="client"
                              v-model="form.type" />
                            <label class="form-check-label" for="client">Client</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="transporteur" value="transporteur"
                              v-model="form.type" />
                            <label class="form-check-label" for="transporteur">Transporteur</label>
                          </div>
                        </div>
                      </div>
                      <div class="form-check mb-3">
                        <input class="form-check-input" id="termsService" type="checkbox" v-model="accepted" />
                        <label class="form-label fs-9 text-transform-none" for="termsService">
                          J’accepte les <a href="#">conditions d’utilisation</a> et la
                          <a href="#">politique de confidentialité</a>
                        </label>
                      </div>

                      <button class="btn btn-primary w-100 mb-3" :disabled="loading">
                        {{ loading ? 'Création...' : 'S’inscrire' }}
                      </button>

                      <div class="text-center">
                        <router-link to="/login_client" class="fs-9 fw-bold">Se connecter à un compte
                          existant</router-link>
                      </div>
                    </form>
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  nom: '',
  email: '',
  password: '',
  confirmPassword: '',
  type: 'transporteur', // Transporteur par défaut
})

const accepted = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  error.value = ''
  success.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  if (!accepted.value) {
    error.value = 'Vous devez accepter les conditions d’utilisation.'
    return
  }

  loading.value = true

  try {
    await axios.post('http://127.0.0.1:8000/api/transporteur/register_client', {
      nom: form.value.nom,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
      type: form.value.type,
    })

    success.value = 'Inscription réussie ! Redirection...'
    setTimeout(() => {
      router.push('/login_client')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de l’inscription.'
  } finally {
    loading.value = false
  }
}
</script>
