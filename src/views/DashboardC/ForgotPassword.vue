<template>
  <main class="main" id="top">
    <div class="container-fluid bg-body-tertiary dark__bg-gray-1200">
      <div class="bg-holder bg-auth-card-overlay" style="background-image:url(../../../assets/img/bg/37.png);"></div>
      <!--/.bg-holder-->
      <div class="row flex-center position-relative min-vh-100 g-0 py-5">
        <div class="col-11 col-sm-10 col-xl-8">
          <div class="card border border-translucent auth-card">
            <div class="card-body pe-md-0">
              <div class="row align-items-center gx-0 gy-7">

                <!-- ✅ Partie gauche (image et slogan) -->
                <div class="col-auto bg-body-highlight dark__bg-gray-1100 rounded-3 position-relative overflow-hidden auth-title-box">
                  <div class="bg-holder" style="background-image:url(../../../assets/img/bg/38.png);"></div>
                  <div class="position-relative px-4 px-lg-7 pt-7 pb-7 text-center text-md-start">
                    <h3 class="mb-3 text-body-emphasis fs-7">R7il Authentification</h3>
                    <p class="text-body-tertiary">Sécurisé, rapide, efficace.</p>
                    <ul class="list-unstyled mb-0">
                      <li class="d-flex align-items-center"><span class="uil uil-check-circle text-success me-2"></span><span class="text-body-tertiary fw-semibold">Rapide</span></li>
                      <li class="d-flex align-items-center"><span class="uil uil-check-circle text-success me-2"></span><span class="text-body-tertiary fw-semibold">Simple</span></li>
                      <li class="d-flex align-items-center"><span class="uil uil-check-circle text-success me-2"></span><span class="text-body-tertiary fw-semibold">Fiable</span></li>
                    </ul>
                  </div>
                  <div class="position-relative text-center d-none d-md-block">
                    <img class="auth-title-box-img d-dark-none" src="../../../assets/img/spot-illustrations/auth.png" alt="">
                    <img class="auth-title-box-img d-light-none" src="../../../assets/img/spot-illustrations/auth-dark.png" alt="">
                  </div>
                </div>

                <!-- ✅ Partie droite (formulaire de réinitialisation) -->
                <div class="col mx-auto">
                  <div class="auth-form-box">
                    <div class="text-center mb-5">
                      <a class="d-flex flex-center text-decoration-none mb-4" href="/">
                        <img src="/template/images/33.png" alt="R7il" width="58">
                      </a>
                      <h3 class="text-body-highlight">Mot de passe oublié ?</h3>
                      <p class="text-body-tertiary mb-4">Saisis ton adresse email, nous t’enverrons un lien pour réinitialiser ton mot de passe.</p>
                    </div>

                    <!-- ✅ Message de succès -->
                    <div v-if="success" class="alert alert-success">
                      {{ success }}
                    </div>

                    <!-- ❌ Message d'erreur -->
                    <div v-if="error" class="alert alert-danger">
                      {{ error }}
                    </div>

                    <!-- ✅ Formulaire -->
                    <form class="d-flex align-items-center" @submit.prevent="handleForgotPassword">
                      <input
                        class="form-control flex-1"
                        v-model="email"
                        type="email"
                        placeholder="Adresse email"
                        required
                      >
                      <button class="btn btn-primary ms-2" type="submit" :disabled="loading">
                        {{ loading ? 'Envoi...' : 'Envoyer' }}
                        <span class="fas fa-chevron-right ms-2"></span>
                      </button>
                    </form>

                    <div class="text-center mt-4">
                      <router-link class="fs-9 fw-bold" to="/login_client">← Retour à la connexion</router-link>
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
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const success = ref('')
const error = ref('')
const loading = ref(false)

const handleForgotPassword = async () => {
  loading.value = true
  success.value = ''
  error.value = ''
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', {
      email: email.value
    })
    success.value = response.data.message
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur lors de l’envoi du lien"
  } finally {
    loading.value = false
  }
}
</script>
