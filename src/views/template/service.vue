<template>
  <section id="content">
    <div class="content-wrap pb-0">
      <div class="container">
        <div id="section-pricing" class="page-section p-0 m-0">
          <div class="row col-mb-30 mb-5">

            <!-- Plan Essai Gratuit -->
            <div class="col-lg-4 col-md-6">
              <div class="pricing-box text-center">
                <div class="pricing-title text-uppercase">
                  <h3>Essai Gratuit</h3>
                </div>
                <div class="pricing-price">
                  GRATUIT<span class="price-tenure">14 jours</span>
                </div>
                <div class="pricing-features border-0 bg-transparent">
                  <ul>
                    <li>Utiliser la plateforme sans limitation</li>
                    <li>Accepter ou refuser les réservations</li>
                    <li>Durée limitée à 14 jours</li>
                    <li>Support 24/7</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <span class="button button-large button-rounded ls-0 disabled" style="border-radius: 23px; cursor: default;">
                    Activé
                  </span>
                </div>
              </div>
            </div>

            <!-- Plan Mensuel -->
            <div class="col-lg-4 col-md-6">
              <div class="pricing-box text-center">
                <div class="pricing-title text-uppercase">
                  <h3>Abonnement Mensuel</h3>
                </div>
                <div class="pricing-price">
                  <span class="price-unit">DH</span>199<span class="price-tenure">/mois</span>
                </div>
                <div class="pricing-features border-0 bg-transparent">
                  <ul>
                    <li>Continuer à utiliser la plateforme</li>
                    <li>Accepter ou refuser les réservations</li>
                    <li>Support 24/7</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <button class="button button-large button-rounded text-capitalize ls-0" @click="demanderAbonnement('mensuel')" style="border-radius: 23px;">
                    Demander à l’administrateur
                  </button>
                </div>
              </div>
            </div>

            <!-- Plan Annuel -->
            <div class="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
              <div class="pricing-box text-center">
                <div class="pricing-title text-uppercase">
                  <h3>Abonnement Annuel</h3>
                </div>
                <div class="pricing-price">
                  <span class="price-unit">DH</span>1999<span class="price-tenure">/an</span>
                </div>
                <div class="pricing-features border-0 bg-transparent">
                  <ul>
                    <li>Accès complet toute l’année</li>
                    <li>Accepter ou refuser les réservations</li>
                    <li>Support 24/7</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <button class="button button-large button-rounded text-capitalize ls-0" @click="demanderAbonnement('annuel')" style="border-radius: 23px;">
                    Demander à l’administrateur
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="clear"></div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServicePage',
  methods: {
    demanderAbonnement(type) {
      const typeTexte = type === 'annuel' ? 'annuel' : 'mensuel'
      if (confirm(`Confirmer la demande d’abonnement ${typeTexte} ?`)) {
        axios.post('/api/demande-abonnement', { type: typeTexte })
          .then(() => {
            alert('Votre demande a été envoyée à l’administrateur.')
          })
          .catch((err) => {
            alert("Une erreur s'est produite.")
            console.error(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.bg-color {
  background-color: rgb(178 59 59) !important;
}

#slider .nav-link:hover:not(.active) {
  border-color: rgba(255, 255, 255, .25);
  background-color: rgba(165, 42, 42, 0.7);
}
</style>
