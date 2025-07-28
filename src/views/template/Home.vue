<template>

    <section id="slider" class="slider-element bg-color"
        style="height: auto; padding: 60px 0; background: url('/template/demos/movers/images/bg-2.png') no-repeat center center / 100% 100%;">

        <div class="container mt-4" style="z-index: 2">
            <div class="text-center">
                <h2 class="text-white h2 fw-semibold mb-2">Bienvenue chez R7il Déménagement & Transport</h2>
                <p class="text-white-50">Des solutions rapides, fiables et professionnelles pour tous vos besoins en
                    déménagement.</p>
            </div>
 <div>
    <!-- 🔄 Spinner de chargement -->
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- ✅ Section CLIENT -->
    <div v-else>
      <div v-if="user?.type === 'client'">
        <!-- 🔄 Réservation en attente -->
        <div v-if="reservationStatut === 'en_attente'" class="alert alert-info text-center mt-5">
          ⏳ Votre demande est en cours de traitement. Un transporteur vous sera attribué prochainement.
        </div>

        <!-- ✅ Réservation acceptée -->
        <div v-else-if="reservationStatut === 'acceptee'" class="text-center mt-5">
          <div class="alert alert-success mb-3">
            ✅ Votre réservation a été acceptée par un transporteur.<br>
            🔹 Pour marquer cette course comme <strong>terminée</strong>, veuillez vous rendre dans votre tableau de bord client.
          </div>
          <a href="/reservation_client" class="btn btn-outline-primary mt-2">
            Accéder au tableau de bord client
          </a>
        </div>

        <!-- 📝 Formulaire (pas de réservation active ou déjà terminée) -->
        <div v-else>
          <div class="row mt-5 justify-content-center">
            <div class="col-lg-6">
              <ul class="nav nav-tabs nav-justified flex-column border-bottom-0 flex-md-row bg-color mt-4" role="tablist">
                <li class="nav-item">
                  <a class="nav-link py-3 active" id="home-moving-tab" data-bs-toggle="tab" href="#home-moving" role="tab" aria-controls="home-moving" aria-selected="true">
                    Résidentiel
                  </a>
                </li>
              </ul>

              <div class="tab-content rounded-bottom shadow bg-white py-4 px-5">
                <div class="tab-pane fade show active" id="home-moving" role="tabpanel" aria-labelledby="home-moving-tab">
                  <p class="mb-4">Déménagez en toute tranquillité vers votre nouveau domicile. Veuillez nous envoyer vos informations et notre équipe vous contactera par courriel dans les plus brefs délais.</p>
                  <p class="text-muted">Merci d'indiquer les détails comme l'étage, la surface, présence d'ascenseur, type de bien, etc.</p>

                  <div class="form-widget">
                    <div v-if="success" class="alert alert-success">{{ success }}</div>
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>

                    <form @submit.prevent="submitForm" class="row home-moving-form position-relative mb-0">
                      <div class="form-process">
                        <div class="css3-spinner">
                          <div class="css3-spinner-scaler"></div>
                        </div>
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="text" v-model="form.adresse_depart" class="form-control required" placeholder="Adresse de départ" required />
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="text" v-model="form.ville_depart" class="form-control required" placeholder="Ville de départ" required />
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="text" v-model="form.adresse_arrivee" class="form-control required" placeholder="Adresse d'arrivée" required />
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="text" v-model="form.ville_arrivee" class="form-control required" placeholder="Ville d'arrivée" required />
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="datetime-local" v-model="form.date_heure" class="form-control required" placeholder="Date du déménagement" required />
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="number" v-model="form.etage" class="form-control" placeholder="Étage (ex: 3)" />
                      </div>

                      <div class="col-sm-6 form-group">
                        <select v-model="form.ascenseur" class="form-select" required>
                          <option disabled value="">Ascenseur disponible ?</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                        </select>
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="number" v-model="form.surface" class="form-control" placeholder="Surface (en m²)"   min="1" step="0.1"/>
                      </div>

                      <div class="col-sm-6 form-group">
                        <input type="text" v-model="form.type_bien" class="form-control" placeholder="Type de bien (ex: Studio, T3...)" />
                      </div>

                      <div class="col-12 form-group">
                        <textarea v-model="form.details" class="form-control" rows="4" placeholder="Détails supplémentaires (ex: objets fragiles…)" required></textarea>
                      </div>

                      <div class="col-12">
                        <button type="submit" class="btn bg-color text-white fw-medium w-100 py-2 mt-2">
                          Envoyer la demande
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-5 d-none d-lg-flex flex-wrap justify-content-center">
              <img src="/template/demos/movers/images/2.svg" alt="Illustration déménagement" loading="lazy" class="d-flex align-self-end ms-5 mt-3" />
            </div>
          </div>
        </div>
      </div>

      <!-- 🚫 TRANSPORTEUR NON AUTORISÉ -->
      <div v-else-if="user?.type === 'transporteur'" class="container py-5 text-center">
        <div class="alert alert-warning">
          ❌ Vous êtes connecté en tant que <strong>transporteur</strong>. Cette section est réservée aux clients.
        </div>
      </div>

      <!-- 🔒 NON CONNECTÉ -->
      <div v-else class="container py-5 text-center">
        <div class="alert alert-info">
          🔐 Vous devez être connecté pour faire une demande de déménagement.
        </div>
        <a href="/login_client" class="btn btn-primary mt-3">Se connecter comme client</a>
      </div>
    </div>
  </div>
        </div>

        <div class="svg-separator">
            <div>
                <svg preserveAspectRatio="xMidYMax meet" viewBox="0 0 1600 100" data-height="100">
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);" d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
						C979.5,96,980,56,1040,56z"></path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);"
                        d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8 c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);"
                        d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8 c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);"
                        d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2 c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);"
                        d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8 c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.75);" d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
						z"></path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4 C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1 c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8 c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8 c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1 c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13 c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11 C1669.9,96,1684.8,96,1692.3,96z">
                    </path>
                    <path style="opacity: 1;fill: rgba(255,255,255,0.3);;"
                        d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z">
                    </path>
                    <path style="fill: rgb(255, 255, 255);"
                        d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z">
                    </path>
                </svg>
                <div class="bg-white" style="height: 150px"></div>
            </div>
        </div>

    </section>

    <!-- Content
		============================================= -->
    <section id="content">

        <div class="content-wrap pb-0">

            <div class="container">

                <div class="row justify-content-center mb-5">
                    <div class="col-lg-7 text-center">
                        <div class="heading-block">
                            <h3 class="text-transform-none mb-3 fw-semibold ls-0">Comment nous facilitons votre
                                déménagement</h3>
                            <span class="text-black-50">
                                Nous mettons tout en œuvre pour rendre votre expérience de déménagement simple, rapide
                                et sans stress. Faites confiance à notre équipe expérimentée pour un service clé en
                                main.
                            </span>
                        </div>
                    </div>


                    <div class="col-lg-8">
                        <div class="row align-items-center">
                            <div class="col-sm-6">
                                <img src="/template/demos/movers/images/others/4.png" alt="Image 1">
                            </div>
                            <div class="col-sm-6">
                                <h3>Après réception de vos informations, notre équipe vous contactera.</h3>
                                <p class="mb-2">Nous vous accompagnerons rapidement pour planifier votre déménagement
                                    selon vos besoins.</p>
                                <a target="_blank" href="https://icons8.com"
                                    class="color btn btn-sm p-0 btn-link"><u>illustration par Ouch.pics</u> <i
                                        class="bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="row align-items-center mt-5">
                            <div class="col-sm-6 mb-4 mb-sm-0">
                                <h3>Emballage et chargement de vos biens.</h3>
                                <p class="mb-2">Nos professionnels prennent en charge l’emballage et le transport avec
                                    soin et efficacité.</p>
                                <a target="_blank" href="https://icons8.com"
                                    class="color btn btn-sm p-0 btn-link"><u>illustration par Ouch.pics</u> <i
                                        class="bi-arrow-right"></i></a>
                            </div>
                            <div class="col-sm-6">
                                <img src="/template/demos/movers/images/others/2.png" alt="Image 2">
                            </div>
                        </div>
                        <div class="row align-items-center mt-5">
                            <div class="col-sm-6">
                                <img src="/template/demos/movers/images/others/1.png" alt="Image 3">
                            </div>
                            <div class="col-sm-6">
                                <h3>Livraison à la date de votre choix.</h3>
                                <p class="mb-2">Nous assurons la livraison à votre nouvelle adresse selon vos
                                    disponibilités.</p>
                                <a target="_blank" href="https://icons8.com"
                                    class="color btn btn-sm p-0 btn-link"><u>illustration par Ouch.pics</u> <i
                                        class="bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="clear"></div>

            <div class="section p-0 dark mb-0"
                style="background: linear-gradient(to right, rgba(25,102,221,0.2), rgba(25,102,221,0.5)), url('/template/demos/movers/images/section/1.jpg') no-repeat center center / cover; min-height: 400px">
                <div class="container">
                    <div class="row justify-content-between mb-4" style="padding: 100px 0 160px;">
                        <div class="col-lg-5 col-md-6 offset-lg-1 pt-3">
                            <a href="https://www.youtube.com/watch?v=P3Huse9K6Xs" data-lightbox="iframe"
                                class="play-video ms-3"><i class="bi-play"></i></a>
                            <h2 class="display-4 fw-bold text-white mt-6">Des services de déménagement sur mesure pour
                                vous.</h2>
                        </div>
                        <div class="col-lg-5 col-md-6 mb-0 mb-md-5">
                            <p class="mb-5">Nous vous accompagnons dans chaque étape de votre déménagement avec
                                professionnalisme, rapidité et sécurité.</p>
                            <h3 class="mb-2 text-white">Nos engagements :</h3>
                            <div class="d-flex">
                                <ul class="col-6 iconlist">
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">100% Fiable</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Sécurisé & Protégé</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Livraison à temps</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Déménageurs vérifiés</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Entreprise agréée</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Pas de frais cachés</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Assistance en direct</span></li>
                                </ul>
                                <ul class="col-6 iconlist">
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Support 24h/24, 7j/7</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Aucun frais supplémentaire</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Livraison possible le dimanche</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span class="ps-2">1
                                            déménageur minimum offert</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Suivi via application</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Livraison à l’international</span></li>
                                    <li class="my-2"><i class="bi-check-circle-fill fw-light"></i> <span
                                            class="ps-2">Service porte à porte</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="clear"></div>
                <svg class="svg-curve" viewBox="0 0 1463 188.03">
                    <path style="fill:#FFF;" d="M-.5,288.5s297-175,792-97,599,52,671,25v143H-.5Z"
                        transform="translate(0 -171.47)" />
                </svg>
            </div>

            <div class="section section-features bg-transparent mt-0 p-0">
                <div class="container">
                    <div class="row col-mb-50 col-mb-lg-80">

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4"
                                    style="background-image: url('/template/demos/movers/images/featured-img/1.jpg');">
                                    <i class="bi-house"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Déménagement de bureau</h3>
                                    <p class="text-muted">Transférez votre entreprise rapidement et sans stress grâce à
                                        notre expertise.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4"
                                    style="background-image: url('/template/demos/movers/images/featured-img/2.jpg');">
                                    <i class="bi-building"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Déménagement résidentiel</h3>
                                    <p class="text-muted">Un accompagnement sur mesure pour déménager votre maison en
                                        toute sérénité.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4"
                                    style="background-image: url('/template/demos/movers/images/featured-img/3.jpg');">
                                    <i class="bi-globe"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Déménagement international</h3>
                                    <p class="text-muted">Nous facilitons vos déménagements à l’étranger avec un service
                                        professionnel.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4">
                                    <i class="fa-solid fa-paw"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Transport d’animaux</h3>
                                    <p class="text-muted">Un soin particulier pour vos compagnons pendant le
                                        déménagement.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4"
                                    style="background-image: url('/template/demos/movers/images/featured-img/1.jpg');">
                                    <i class="bi-car-front"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Transport de voiture</h3>
                                    <p class="text-muted">Votre véhicule transporté en toute sécurité, où que vous
                                        alliez.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="feature-box media-box">
                                <div class="fbox-icon position-relative mb-4">
                                    <i class="bi-truck"></i>
                                </div>
                                <div class="fbox-content">
                                    <h3 class="fw-semibold">Location de camion</h3>
                                    <p class="text-muted">Louez un camion adapté à vos besoins de transport ou de
                                        déménagement.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div class="clear"></div>

            <div class="section-map mb-6 mt-6">
                <div class="container">
                    <img src="/template/demos/hosting/images/svg/map.png" alt="Carte du Maroc" class="img-fluid map-image">
                    <div class="map-title">
                        <h2 class="text-center">Nous desservons tout le Maroc</h2>
                        <div class="d-flex justify-content-center">
                            <ul class="iconlist m-0 pe-5">
                                <li><a href="#">Casablanca</a></li>
                                <li><a href="#">Rabat</a></li>
                                <li><a href="#">Fès</a></li>
                                <li><a href="#">Marrakech</a></li>
                                <li><a href="#">Agadir</a></li>
                            </ul>
                            <ul class="iconlist m-0 ps-5">
                                <li><a href="#">Tanger</a></li>
                                <li><a href="#">Oujda</a></li>
                                <li><a href="#">Meknès</a></li>
                                <li><a href="#">Laâyoune</a></li>
                                <li><a href="#">Voir toutes les villes…</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>


            <div class="clear"></div>

            <div class="section section-gradient m-0">
                <div class="svg-separator top rotate">
                    <div>
                        <svg preserveAspectRatio="xMidYMax meet" class="svg-separator sep3" viewBox="0 0 1600 100">
                            <path style="opacity: 1;fill: #FFF;"
                                d="M-40,71.627C20.307,71.627,20.058,32,80,32s60.003,40,120,40s59.948-40,120-40s60.313,40,120,40s60.258-40,120-40s60.202,40,120,40s60.147-40,120-40s60.513,40,120,40s60.036-40,120-40c59.964,0,60.402,40,120,40s59.925-40,120-40s60.291,40,120,40s60.235-40,120-40s60.18,40,120,40s59.82,0,59.82,0l0.18,26H-60V72L-40,71.627z">
                            </path>
                            <path class="svg-themecolor" style="opacity: 0.1;"
                                d="M-40,83.627C20.307,83.627,20.058,44,80,44s60.003,40,120,40s59.948-40,120-40s60.313,40,120,40s60.258-40,120-40s60.202,40,120,40s60.147-40,120-40s60.513,40,120,40s60.036-40,120-40c59.964,0,60.402,40,120,40s59.925-40,120-40s60.291,40,120,40s60.235-40,120-40s60.18,40,120,40s59.82,0,59.82,0l0.18,14H-60V84L-40,83.627z">
                            </path>
                            <path style="fill: #FFF;"
                                d="M-40,95.627C20.307,95.627,20.058,56,80,56s60.003,40,120,40s59.948-40,120-40s60.313,40,120,40s60.258-40,120-40s60.202,40,120,40s60.147-40,120-40s60.513,40,120,40s60.036-40,120-40c59.964,0,60.402,40,120,40s59.925-40,120-40s60.291,40,120,40s60.235-40,120-40s60.18,40,120,40s59.82,0,59.82,0l0.18,138H-60V96L-40,95.627z">
                            </path>
                        </svg>
                    </div>
                </div>
                <div class="container">
                    <div class="mx-auto mw-lg" style="padding: 120px 0 50px;">
                        <div class="d-flex justify-content-between align-items-center mb-4 dark">
                            <h3 class="mb-0">Ce que disent nos clients :</h3>
                            <a href="#"
                                class="button button-white button-light button-rounded button-small fw-medium m-0">Voir
                                plus</a>
                        </div>
                        <div class="row row-eq-height justify-content-center">
                            <div class="col-md-6">
                                <div class="bg-white shadow-sm d-flex justify-content-center flex-column rounded">
                                    <div class="d-flex flex-row mb-4 align-items-center">
                                        <a href="#"><img class="rounded-circle"
                                                src="/template/demos/pet/images/testimonials/1.jpg" alt="Témoignage client"
                                                width="80" height="80"></a>
                                        <h4 class="ms-3 mb-0">Ahmed El Mansouri</h4>
                                    </div>
                                    <div class="border-start border-width-3 ps-4">
                                        <h4 class="mb-4 fw-normal">Le service était impeccable ! L’équipe est arrivée à
                                            l’heure, a bien emballé
                                            mes affaires et tout est arrivé en parfait état à Marrakech. Je recommande
                                            vivement.</h4>
                                        <div class="h6 text-uppercase fw-bold ls-1">- Casablanca</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                                <div
                                    class="bg-white shadow-sm d-flex justify-content-center flex-column mb-3 rounded p-5">
                                    <div class="border-start border-width-3 ps-4">
                                        <p class="mb-4">Excellent service, personnel très professionnel et courtois. Mon
                                            déménagement de Rabat à
                                            Fès s’est déroulé sans aucun souci.</p>
                                        <div class="h6 text-uppercase fw-bold ls-1">- Rabat</div>
                                    </div>
                                </div>
                                <div class="bg-white shadow-sm d-flex justify-content-center flex-column rounded p-5">
                                    <div class="border-start border-width-3 ps-4">
                                        <p>Très bon rapport qualité/prix. L’équipe a pris soin de mes meubles et a été
                                            très rapide. Merci !</p>
                                        <div class="h6 text-uppercase fw-bold ls-1">- Agadir</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-bg d-none d-md-block">
                            <img src="/template/demos/movers/images/dot-grid.svg" alt="Image décorative">
                        </div>
                    </div>
                </div>

            </div>

            <div class="container mb-5">
                <div class="section-clients mx-auto" style="max-width: 700px">
                    <div class="text-center mb-4">
                        <span class="badge rounded-pill lightthemecolor color text-uppercase ls-1 fw-medium py-2 px-3">
                            Partenaire de confiance depuis 2024
                        </span>
                    </div>
                    <div class="clear"></div>

                    <div class="toggle mt-5" data-state="open">
                        <div class="toggle-header flex-row-reverse">
                            <div class="toggle-icon">
                                <i class="toggle-closed bi-plus-circle"></i>
                                <i class="toggle-open bi-x-circle"></i>
                            </div>
                            <div class="toggle-title fw-medium">
                                Pourquoi choisir R7il pour votre déménagement ?
                            </div>
                        </div>
                        <div class="toggle-content text-black-50">
                            Chez R7il, nous plaçons votre tranquillité au cœur de notre mission. Notre équipe
                            expérimentée vous accompagne de A à Z, avec un service rapide, sécurisé et personnalisé, où
                            que vous soyez au Maroc.
                        </div>
                    </div>

                    <div class="toggle">
                        <div class="toggle-header flex-row-reverse">
                            <div class="toggle-icon">
                                <i class="toggle-closed bi-plus-circle"></i>
                                <i class="toggle-open bi-x-circle"></i>
                            </div>
                            <div class="toggle-title fw-medium">
                                Équipements modernes et fiables
                            </div>
                        </div>
                        <div class="toggle-content text-black-50">
                            Nous utilisons des outils professionnels pour le levage, l’emballage et le transport afin de
                            garantir la sécurité de vos biens, même les plus fragiles. Nos camions sont adaptés aux
                            routes marocaines.
                        </div>
                    </div>

                    <div class="toggle border-0">
                        <div class="toggle-header flex-row-reverse">
                            <div class="toggle-icon">
                                <i class="toggle-closed bi-plus-circle"></i>
                                <i class="toggle-open bi-x-circle"></i>
                            </div>
                            <div class="toggle-title fw-medium">
                                Service client à l’écoute
                            </div>
                        </div>
                        <div class="toggle-content text-black-50">
                            Notre service client est disponible 7j/7 pour répondre à vos questions, vous conseiller sur
                            la logistique et assurer un suivi transparent jusqu’à la livraison finale.
                        </div>
                    </div>
                </div>
            </div>


            <div class="clear"></div>

           <div class="section dark pt-0 mb-0 bg-color"
    style="background: url('/template/demos/movers/images/bg-2.png') no-repeat center bottom / 100%; overflow: visible">
    <svg viewBox="0 0 1960 206.8" class="bg-white">
        <path class="svg-themecolor" style="opacity:0.2;"
            d="M0,142.8A2337.49,2337.49,0,0,1,297.5,56.3C569.33-3.53,783.89.22,849.5,2.3c215.78,6.86,382.12,45.39,503.25,73.45,158.87,36.8,283.09,79.13,458.75,54.55A816.49,816.49,0,0,0,1983,86.8v110H0Z">
        </path>
        <path class="svg-themecolor" d="M.5,152.8s498-177,849-150,1031,238,1134,94v110H.5Z"></path>
    </svg>
    <div class="container">
        <div class="row align-items-center justify-content-center text-center my-4">

            <div class="col-sm-8">
                <div class="heading-block border-bottom-0 mb-4">
                    <h2 class="fw-semibold ls-0 text-transform-none mb-3"
                        style="font-size: 44px; line-height: 1.3">Besoin d’aide pour votre déménagement ?</h2>
                    <p>Contactez nos spécialistes pour un service rapide, sécurisé et adapté à vos besoins partout au Maroc.</p>
                </div>
                <a href="demo-movers-contact.html"
                    class="button button-white button-light button-rounded fw-medium m-0">Nous contacter</a>
            </div>

        </div>
    </div>
</div>

        </div>
    </section><!-- #content end -->
  <div id="gotoTop" class="uil uil-angle-up"></div>
</template>


 <style scoped>
.bg-color {
  background-color: rgb(178 59 59) !important;
}
#slider .nav-link:hover:not(.active) {
    border-color: rgba(255, 255, 255, .25);
background-color: rgba(165,42,42, 0.7);
}
</style>


<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

// États
const isLoading = ref(true)
const reservationStatut = ref(null)
const reservationId = ref(null)
const success = ref('')
const error = ref('')
const user = ref(null)

// Formulaire
const form = ref({
  adresse_depart: '',
  ville_depart: '',
  adresse_arrivee: '',
  ville_arrivee: '',
  date_heure: '',
  etage: '',
  ascenseur: '',
  surface: '',
  type_bien: '',
  details: '',
})

// Chargement initial : profil client + dernière réservation
onMounted(async () => {
  const token = localStorage.getItem('transporteur_token')
  if (!token) {
    isLoading.value = false
    return
  }

  try {
    const res = await axios.get('/transporteur/profil_client')
    user.value = res.data

    const res2 = await axios.get(`/reservations/client/${user.value.id}/latest`)
    reservationId.value = res2.data?.id || null
    reservationStatut.value = res2.data?.statut || null

    console.log('🟢 Dernière réservation:', res2.data)
  } catch (err) {
    console.error('Erreur chargement profil ou réservation', err)
    localStorage.removeItem('transporteur_token')
    window.location.href = '/login_client'
  } finally {
    isLoading.value = false
  }
})

// Envoi du formulaire de réservation
const submitForm = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    const res = await axios.post('/reservations', {
      client_id: user.value?.id,
      adresse_depart: form.value.adresse_depart,
      ville_depart: form.value.ville_depart,
      adresse_arrivee: form.value.adresse_arrivee,
      ville_arrivee: form.value.ville_arrivee,
      date_heure: form.value.date_heure,
      etage: form.value.etage,
      ascenseur: form.value.ascenseur === 'oui' ? 1 : 0,
      surface: String(form.value.surface),
      type_bien: form.value.type_bien,
      details: form.value.details,
    })

    success.value = '✅ Demande envoyée avec succès'
    form.value = {
      adresse_depart: '',
      ville_depart: '',
      adresse_arrivee: '',
      ville_arrivee: '',
      date_heure: '',
      etage: '',
      ascenseur: '',
      surface: '',
      type_bien: '',
      details: '',
    }

    reservationId.value = res.data?.reservation?.id || null
    reservationStatut.value = 'en_attente'
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de l’envoi de la demande.'
  } finally {
    isLoading.value = false
  }
}
</script>
