<template>
  <header id="header" class="dark header-size-sm" data-sticky-shrink="false">
    <div class="container">
      <div class="header-row">
        <!-- Logo -->
        <div id="logo" class="ms-auto ms-md-0">
          <a href="/">
            <!-- <img class="logo-default" srcset="/images/logo.png, /images/logo@2x.png 2x" src="/images/logo@2x.png" alt="Logo R7il">
            <img class="logo-dark" srcset="/images/logo-dark.png, /images/logo-dark@2x.png 2x" src="/images/logo-dark@2x.png" alt="Logo R7il"> -->

            <img
              class="logo-default"
              srcset="/template/images/33.png"
              :style="{ color: 'white' }"
              alt="Logo R7il"
            />
            <img
              class="logo-dark"
              srcset="/template/images/33.png"
              :style="{ color: 'white' }"
              Z
              alt="Logo R7il"
            />
          </a>
        </div>

        <!-- Informations de contact -->
        <ul class="header-extras d-none d-sm-flex mx-auto mx-md-0 mb-4 mb-md-0">
          <li>
            <i class="i-plain bi-telephone m-0"></i>
            <div class="he-text fw-normal text-white-50">
              Appelez-nous :
              <span
                ><a href="tel:+212 619 222 222" class="text-white fw-medium"
                  >+212 619 222 222</a
                ></span
              >
            </div>
          </li>
          <li>
            <i class="i-plain bi-envelope m-0"></i>
            <div class="he-text fw-normal text-white-50">
              Écrivez-nous :
              <span
                ><a href="mailto:R7il@R7il.ma" target="_top" class="text-white fw-medium"
                  >R7il@R7il.ma</a
                ></span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div id="header-wrap">
      <div class="container">
        <div class="header-row justify-content-between flex-row-reverse flex-lg-row">
          <div class="header-misc">


            <!-- Bouton d’action -->
           <!-- Si PAS connecté -->
<div class="header-buttons d-none d-sm-inline-block" v-if="!isConnected">
  <a
    href="/login_client"
    class="button button-rounded button-white button-light button-small m-0"
  >
    Se Connecter
  </a>
</div>

<!-- Si connecté -->
<div class="dropdown d-none d-sm-inline-block" v-else>
  <button
    class="button button-rounded button-white button-light button-small dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="padding: 6px 12px;"
  >
    Mon Compte

  </button>
  <ul class="dropdown-menu dropdown-menu-end shadow">
    <li>
      <a class="dropdown-item" href="/dashboard_client">
        <i class="bi bi-speedometer2 me-2"></i> Tableau de bord
      </a>
    </li>
    <li>
      <a class="dropdown-item" href="/edit_client">
        <i class="bi bi-person-lines-fill me-2"></i> Modifier profil
      </a>
    </li>
    <li><hr class="dropdown-divider" /></li>
    <li>
      <a class="dropdown-item text-danger" href="#" @click.prevent="handleLogout">
        <i class="bi bi-box-arrow-right me-2"></i> Se Déconnecter
      </a>
    </li>
  </ul>
</div>

          </div>

          <!-- Menu mobile -->
          <div class="primary-menu-trigger">
            <button class="cnvs-hamburger" type="button" title="Ouvrir le menu">
              <span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>
            </button>
          </div>

          <!-- Menu principal -->
          <nav class="primary-menu with-arrows">
            <ul class="menu-container">
              <li class="menu-item" :class="{ current: $route.path === '/' }">
                <router-link class="menu-link" to="/">
                  <div>Accueil</div>
                </router-link>
              </li>
              <li class="menu-item" :class="{ current: $route.path === '/presentation' }">
                <router-link class="menu-link" to="/presentation">
                  <div>Notre entreprise</div>
                </router-link>
              </li>


              <li class="menu-item" :class="{ current: $route.path.startsWith('/service') }">
                <router-link class="menu-link" to="/service">
                  <div>Services</div>
                </router-link>
              </li>

              <li class="menu-item" :class="{ current: $route.path.startsWith('/contact') }">
                <router-link class="menu-link" to="/contact">
                  <div>Contact</div>
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Formulaire de recherche -->
          <form class="top-search-form" action="/recherche" method="get">
            <input
              type="text"
              name="q"
              class="form-control"
              placeholder="Tapez votre recherche..."
              autocomplete="off"
            />
          </form>
        </div>
      </div>
    </div>

    <div class="header-wrap-clone"></div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const isConnected = ref(false)
const user = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('transporteur_token')
  if (!token) return

  isConnected.value = true

  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data
  } catch (err) {
    console.error('Erreur chargement profil', err)
    localStorage.removeItem('transporteur_token')
    window.location.href = '/login_client'
  }
})

const handleLogout = () => {
  localStorage.removeItem('transporteur_token')
  localStorage.removeItem('transporteur_user')
  window.location.href = '/'
}
</script>


