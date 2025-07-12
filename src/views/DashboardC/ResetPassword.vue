<template>
  <main class="main" id="top">
    <div class="container-fluid bg-body-tertiary dark__bg-gray-1200">
      <div class="bg-holder bg-auth-card-overlay" style="background-image:url(../../../assets/img/bg/37.png);"></div>
      <div class="row flex-center position-relative min-vh-100 g-0 py-5">
        <div class="col-11 col-sm-10 col-xl-8">
          <div class="card border border-translucent auth-card">
            <div class="card-body pe-md-0">
              <div class="row align-items-center gx-0 gy-7">
                <div class="col-auto bg-body-highlight dark__bg-gray-1100 rounded-3 position-relative overflow-hidden auth-title-box">
                  <div class="bg-holder" style="background-image:url(../../../assets/img/bg/38.png);"></div>
                  <div class="position-relative px-4 px-lg-7 pt-7 pb-7 pb-sm-5 text-center text-md-start pb-lg-7">
                    <h3 class="mb-3 text-body-emphasis fs-7">Réinitialisation du mot de passe</h3>
                    <p class="text-body-tertiary">Saisissez votre nouveau mot de passe.</p>
                  </div>
                  <div class="position-relative z-n1 mb-6 d-none d-md-block text-center mt-md-15">
                    <img class="auth-title-box-img d-dark-none" src="../../../assets/img/spot-illustrations/auth.png" alt="">
                    <img class="auth-title-box-img d-light-none" src="../../../assets/img/spot-illustrations/auth-dark.png" alt="">
                  </div>
                </div>

                <div class="col mx-auto">
                  <div class="auth-form-box">
                    <div class="text-center mb-7">
                      <a class="d-flex flex-center text-decoration-none mb-4" href="/">
                        <div class="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                          <img src="../../../assets/img/icons/logo.png" alt="R7il" width="58">
                        </div>
                      </a>
                      <h4 class="text-body-highlight">Définir un nouveau mot de passe</h4>
                      <p class="text-body-tertiary">Utilisez un mot de passe fort et sécurisé</p>
                    </div>

                    <!-- Message succès -->
                    <div v-if="success" class="alert alert-success text-center">{{ success }}</div>

                    <!-- Message erreur -->
                    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

                    <form class="mt-5" @submit.prevent="handleReset">
                      <input type="hidden" v-model="token" />

                      <div class="mb-3">
                        <label>Email</label>
                        <input type="email" v-model="email" class="form-control" required />
                      </div>

                      <div class="mb-3">
                        <label>Nouveau mot de passe</label>
                        <input type="password" v-model="password" class="form-control" placeholder="Nouveau mot de passe" required />
                      </div>

                      <div class="mb-4">
                        <label>Confirmation du mot de passe</label>
                        <input type="password" v-model="password_confirmation" class="form-control" placeholder="Confirmer le mot de passe" required />
                      </div>

                      <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                        {{ loading ? 'Réinitialisation...' : 'Définir le mot de passe' }}
                      </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const token = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const success = ref('')
const error = ref('')
const loading = ref(false)

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  token.value = urlParams.get('token') || ''
  email.value = urlParams.get('email') || ''
})

const handleReset = async () => {
  loading.value = true
  success.value = ''
  error.value = ''
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    success.value = response.data.message

    // ✅ Redirection après 2 secondes vers la page login
    setTimeout(() => {
      router.push('/login_client')
    }, 2000)

  } catch (err) {
    error.value = err.response?.data?.message || "Erreur lors de la réinitialisation."
  } finally {
    loading.value = false
  }
}
</script>
