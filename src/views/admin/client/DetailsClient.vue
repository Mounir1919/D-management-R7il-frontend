<template>
  <AppHeader>
    <main class="main" id="top">
      <div class="mb-9">
        <div class="row align-items-center justify-content-between g-3 mb-4">
          <div class="col-auto">
            <h2 class="mb-0">Détails du client</h2>
          </div>
          <div class="col-auto">
            <div class="row g-3">
              <div class="col-auto">
                <button class="btn btn-phoenix-danger">
                  <span class="fa-solid fa-trash-can me-2"></span>Supprimer
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-phoenix-secondary">
                  <span class="fas fa-key me-2"></span>Réinitialiser le mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="client" class="row g-5">
          <div class="col-12 col-xxl-4">
            <div class="row g-3 h-100">
              <div class="col-12 col-md-7 col-xxl-12">
                <div class="card h-100 h-xxl-auto">
                  <div class="card-body d-flex flex-column justify-content-between pb-3">
                    <div class="row align-items-center g-5 mb-3 text-center text-sm-start">
                      <div class="col-12 col-sm-auto mb-sm-2">
                        <div class="avatar avatar-5xl">
                          <img
                            class="rounded-circle"
                            :src="
                              client.photo_profil
                                ? `http://127.0.0.1:8000/${client.photo_profil}`
                                : '/assets/img/team/avatar.webp'
                            "
                            alt="Photo de profil"
                            width="100"
                            height="100"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-sm-auto flex-1">
                        <h3>{{ client.nom }}</h3>
                        <p class="text-body-secondary">
                          Inscrit le {{ formatDate(client.date_inscription) }}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex flex-between-center border-top border-dashed pt-4">
                      <div>
                        <h6>Statut</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.status }}</p>
                      </div>
                      <div>
                        <h6>Validation</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.statut_validation }}</p>
                      </div>
                      <div>
                        <h6>ID</h6>
                        <p class="fs-7 text-body-secondary mb-0">{{ client.id }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-5 col-xxl-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                      <h3 class="me-1">Adresse</h3>
                      <button class="btn btn-link p-0">
                        <span class="fas fa-pen fs-8 ms-3 text-body-quaternary"></span>
                      </button>
                    </div>
                    <h5 class="text-body-secondary">Adresse complète</h5>
                    <p class="text-body-secondary">{{ client.adresse }}</p>

                    <div class="mb-3">
                      <h5 class="text-body-secondary">Email</h5>
                      <a :href="`mailto:${client.email}`">{{ client.email }}</a>
                    </div>

                    <h5 class="text-body-secondary">Téléphone</h5>
                    <a class="text-body-secondary" :href="`tel:${client.telephone}`">{{
                      client.telephone
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-xxl-8">
            <div class="mb-6">
              <h3 class="mb-4">Orders <span class="text-body-tertiary fw-normal">(97)</span></h3>
              <div
                class="border-top border-bottom border-translucent"
                id="customerOrdersTable"
                data-list='{"valueNames":["order","total","payment_status","fulfilment_status","delivery_type","date"],"page":6,"pagination":true}'
              >
                <div class="table-responsive scrollbar">
                  <table class="table table-sm fs-9 mb-0">
                    <thead>
                      <tr>
                        <th
                          class="sort white-space-nowrap align-middle ps-0 pe-3"
                          scope="col"
                          data-sort="order"
                          style="width: 10%"
                        >
                          ORDER
                        </th>
                        <th
                          class="sort align-middle text-end pe-7"
                          scope="col"
                          data-sort="total"
                          style="width: 10%"
                        >
                          TOTAL
                        </th>
                        <th
                          class="sort align-middle white-space-nowrap pe-3"
                          scope="col"
                          data-sort="payment_status"
                          style="width: 15%"
                        >
                          PAYMENT STATUS
                        </th>
                        <th
                          class="sort align-middle white-space-nowrap text-start pe-3"
                          scope="col"
                          data-sort="fulfilment_status"
                          style="width: 20%"
                        >
                          FULFILMENT STATUS
                        </th>
                        <th
                          class="sort align-middle white-space-nowrap text-start"
                          scope="col"
                          data-sort="delivery_type"
                          style="width: 30%"
                        >
                          DELIVERY TYPE
                        </th>
                        <th class="sort align-middle text-end pe-0" scope="col" data-sort="date">
                          DATE
                        </th>
                        <th class="sort text-end align-middle pe-0 ps-5" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody class="list" id="customer-order-table-body">
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2453</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $87
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Paid</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Order Fulfilled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Cash on delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Dec 12, 12:56 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2452</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $7264
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Cancelled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-info"
                            ><span class="badge-label">Ready to pickup</span
                            ><span
                              class="ms-1"
                              data-feather="info"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Free shipping
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Dec 9, 2:28PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2451</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $375
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Pending</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Partial FulfiLled</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Local pickup
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Dec 4, 12:56 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2450</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $657
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Cancelled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Order CancelLed</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Standard shipping
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Dec 1, 4:07 AM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2449</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $9562
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-danger"
                            ><span class="badge-label">Failed</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Order Fulfilled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Express
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 28, 7:28 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2448</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $46
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Paid</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-danger"
                            ><span class="badge-label">Delivery Delayed</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Local delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 24, 10:16 AM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2447</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $953
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Pending</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Fulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Cash on delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 18, 5:43 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2446</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $12
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Pending</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Fulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Standard shipping
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 18, 2:09 AM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2445</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $3927
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Paid</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Canceled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Cash on delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 16, 3:22 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2444</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $5937
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Paid</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Ready to pickup</span
                            ><span
                              class="ms-1"
                              data-feather="info"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Local pickup
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 09, 8:49 AM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2443</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $124
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-danger"
                            ><span class="badge-label">Failed</span
                            ><span
                              class="ms-1"
                              data-feather="minus-circle"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-danger"
                            ><span class="badge-label">Unfulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Cash on delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 05, 4:35 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2442</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $542
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Pending</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Fulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Standard shipping
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 05, 12:00 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2441</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $1480
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Paid</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-info"
                            ><span class="badge-label">Ready to pickup</span
                            ><span
                              class="ms-1"
                              data-feather="info"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Local delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Nov 02, 2:00 AM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2440</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $80
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-secondary"
                            ><span class="badge-label">Cancelled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-danger"
                            ><span class="badge-label">Unfulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="x"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Free shipping
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Oct 30, 4:25 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap ps-0">
                          <a class="fw-semibold" href="#!">#2439</a>
                        </td>
                        <td
                          class="total align-middle text-end fw-semibold pe-7 text-body-highlight"
                        >
                          $999
                        </td>
                        <td
                          class="payment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-warning"
                            ><span class="badge-label">Pending</span
                            ><span
                              class="ms-1"
                              data-feather="alert-octagon"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="fulfilment_status align-middle white-space-nowrap text-start fw-bold text-body-tertiary"
                        >
                          <span class="badge badge-phoenix fs-10 badge-phoenix-success"
                            ><span class="badge-label">Fulfiled</span
                            ><span
                              class="ms-1"
                              data-feather="check"
                              style="height: 12.8px; width: 12.8px"
                            ></span
                          ></span>
                        </td>
                        <td
                          class="delivery_type align-middle white-space-nowrap text-body fs-9 text-start"
                        >
                          Cash on delivery
                        </td>
                        <td
                          class="date align-middle white-space-nowrap text-body-tertiary fs-9 ps-4 text-end"
                        >
                          Oct 28, 3:00 PM
                        </td>
                        <td class="align-middle white-space-nowrap text-end pe-0 ps-5">
                          <div class="btn-reveal-trigger position-static">
                            <button
                              class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-boundary="window"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-bs-reference="parent"
                            >
                              <span class="fas fa-ellipsis-h fs-10"></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-2">
                              <a class="dropdown-item" href="#!">View</a
                              ><a class="dropdown-item" href="#!">Export</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item text-danger" href="#!">Remove</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row align-items-center justify-content-between py-2 pe-0 fs-9">
                  <div class="col-auto d-flex">
                    <p
                      class="mb-0 d-none d-sm-block me-3 fw-semibold text-body"
                      data-list-info="data-list-info"
                    ></p>
                    <a class="fw-semibold" href="#!" data-list-view="*"
                      >View all<span
                        class="fas fa-angle-right ms-1"
                        data-fa-transform="down-1"
                      ></span></a
                    ><a class="fw-semibold d-none" href="#!" data-list-view="less"
                      >View Less<span
                        class="fas fa-angle-right ms-1"
                        data-fa-transform="down-1"
                      ></span
                    ></a>
                  </div>
                  <div class="col-auto d-flex">
                    <button class="page-link" data-list-pagination="prev">
                      <span class="fas fa-chevron-left"></span>
                    </button>
                    <ul class="mb-0 pagination"></ul>
                    <button class="page-link pe-0" data-list-pagination="next">
                      <span class="fas fa-chevron-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>  
          <p>Chargement des détails du client...</p>
        </div>
      </div>
    </main>
  </AppHeader>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppHeader from '@/components/admin/AppHeader.vue'

const route = useRoute()
const clientId = route.params.id
const client = ref(null)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients/${clientId}`)
    client.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement du client :', error)
  }
})
</script>
