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
            <!-- Recherche -->
            <div id="top-search" class="header-misc-icon">
              <a href="#" id="top-search-trigger"
                ><i class="uil uil-search"></i><i class="bi-x-lg"></i
              ></a>
            </div>

            <!-- Bouton d’action -->
            <div class="header-buttons d-none d-sm-inline-block">
              <router-link
                to="/login_client"
                data-scrollto="#slider"
                data-offset="-80"
                class="button button-rounded button-white button-light button-small m-0"
              >
                Se Connecter
              </router-link>
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

              <li class="menu-item">
                <router-link class="menu-link" to="#">
                  <div>Tarifs</div>
                </router-link>
                <ul class="sub-menu-container" data-class="up-lg:not-dark">
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="bi-house"></i>Déménagement résidentiel</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="bi-building"></i>Déménagement de bureau</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="bi-globe"></i>Déménagement international</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="fa-solid fa-paw"></i>Transport d’animaux</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="bi-car-front"></i>Transport de voiture</div>
                    </a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#">
                      <div><i class="bi-truck"></i>Louer un camion</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="menu-item" :class="{ current: $route.path.startsWith('/transporteur') }">
                <router-link class="menu-link" to="/transporteur">
                  <div>Transporteurs</div>
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

<script>
export default {
  name: 'AppHeader',
}
</script>

<style>
@import '@/assets/template/css/global.css';
</style>

