<template>
  <main class="main" id="top">
    <div class="row vh-100 g-0">
      <div class="col-lg-6 position-relative d-none d-lg-block">
        <div
          class="bg-holder"
          style="
            background-image: url(../../../src/assets/DashboardC/assets/img/bg/login-admin.webp);
          "
        ></div>
      </div>
      <div class="col-lg-6">
        <div class="row flex-center h-100 g-0 px-4 px-sm-0">
          <div class="col col-sm-6 col-lg-7 col-xl-6">
            <a class="d-flex flex-center text-decoration-none mb-4" href="../../../index-1.html">
              <div class="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                <img
                  src="../../../src/assets/DashboardC/assets/img/favicons/favicon-R7il.png"
                  alt="phoenix"
                  width="58"
                />
              </div>
            </a>
            <div class="text-center mb-7">
              <h3 class="text-body-highlight">Se connecter</h3>
              <p class="text-body-tertiary">Compte Admin</p>
            </div>

            <div class="mb-3 text-start">
              <label class="form-label" for="email">Adresse email</label>
              <div class="form-icon-container">
                <input
                  class="form-control form-icon-input"
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  v-model="email"
                /><span class="fas fa-user text-body fs-9 form-icon"></span>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label class="form-label" for="password">Mot de passe</label>
              <div class="form-icon-container" data-password="data-password">
                <input
                  class="form-control form-icon-input pe-6"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  v-model="password"
                  data-password-input="data-password-input"
                /><span class="fas fa-key text-body fs-9 form-icon"></span>
                <button
                  class="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary"
                  data-password-toggle="data-password-toggle"
                >
                  <span class="uil uil-eye show"></span><span class="uil uil-eye-slash hide"></span>
                </button>
              </div>
            </div>
            <div class="row flex-between-center mb-7">
              <div class="col-auto">
                <div class="form-check mb-0">
                  <input
                    class="form-check-input"
                    id="basic-checkbox"
                    type="checkbox"
                    checked="checked"
                  /><label class="form-check-label mb-0" for="basic-checkbox"
                    >Se souvenir de moi</label
                  >
                </div>
              </div>
              <div class="col-auto">
                <a class="fs-9 fw-semibold" href="../simple/forgot-password.html"
                  >Mot de passe oublié ?</a
                >
              </div>
            </div>
            <button class="btn btn-primary w-100 mb-3" @click="login">Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role === 'admin') {
      this.$router.push('/admin/dashboard')
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        })

        const user = response.data.user

        if (user.role !== 'admin') {
          alert("Accès refusé. Vous n'êtes pas un administrateur.")
          return
        }

        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(user))

        this.$router.push('/admin/dashboard')
        window.location.reload()
      } catch (error) {
        alert('Échec de la connexion. Vérifiez vos identifiants.')
        console.error(error)
      }
    },
  },
}
</script>
