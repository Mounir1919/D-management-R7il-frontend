<template>
  <AppHeader>
    <main class="main" id="top">
      <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><a href="#!">Page 1</a></li>
          <li class="breadcrumb-item"><a href="#!">Page 2</a></li>
          <li class="breadcrumb-item active">Default</li>
        </ol>
      </nav>
      <div class="mb-9">
        <div class="row g-2 mb-4">
          <div class="col-auto">
            <h2 class="mb-0">Customers</h2>
          </div>
        </div>
        <ul class="nav nav-links mb-3 mb-lg-2 mx-n3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"
              ><span>All </span><span class="text-body-tertiary fw-semibold">(68817)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><span>New </span><span class="text-body-tertiary fw-semibold">(6)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><span>Abandoned checkouts </span
              ><span class="text-body-tertiary fw-semibold">(17)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><span>Locals </span><span class="text-body-tertiary fw-semibold">(6,810)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><span>Email subscribers </span
              ><span class="text-body-tertiary fw-semibold">(8)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><span>Top reviews </span><span class="text-body-tertiary fw-semibold">(2)</span></a
            >
          </li>
        </ul>
        <div
          id="products"
          data-list='{"valueNames":["customer","email","total-orders","total-spent","city","last-seen","last-order"],"page":10,"pagination":true}'
        >
          <div class="mb-4">
            <div class="row g-3">
              <div class="col-auto">
                <div class="search-box">
                  <form class="position-relative">
                    <input
                      class="form-control search-input search"
                      type="search"
                      placeholder="Search customers"
                      aria-label="Search"
                    />
                    <span class="fas fa-search search-box-icon"></span>
                  </form>
                </div>
              </div>
              <div class="col-auto scrollbar overflow-hidden-y flex-grow-1">
                <div class="btn-group position-static" role="group">
                  <div class="btn-group position-static text-nowrap">
                    <button
                      class="btn btn-phoenix-secondary px-7 flex-shrink-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      data-boundary="window"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-bs-reference="parent"
                    >
                      Country<span class="fas fa-angle-down ms-2"></span>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">US</a></li>
                      <li><a class="dropdown-item" href="#">Uk</a></li>
                      <li><a class="dropdown-item" href="#">Australia</a></li>
                    </ul>
                  </div>
                  <div class="btn-group position-static text-nowrap">
                    <button
                      class="btn btn-sm btn-phoenix-secondary px-7 flex-shrink-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      data-boundary="window"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-bs-reference="parent"
                    >
                      VIP<span class="fas fa-angle-down ms-2"></span>
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">VIP 1</a></li>
                      <li><a class="dropdown-item" href="#">VIP 2</a></li>
                      <li><a class="dropdown-item" href="#">VIP 3</a></li>
                      <li></li>
                    </ul>
                  </div>
                  <button class="btn btn-phoenix-secondary px-7 flex-shrink-0">More filters</button>
                </div>
              </div>
              <div class="col-auto">
                <button class="btn btn-link text-body me-4 px-0">
                  <span class="fa-solid fa-file-export fs-9 me-2"></span>Export</button
                ><button class="btn btn-primary">
                  <span class="fas fa-plus me-2"></span>Add customer
                </button>
              </div>
            </div>
          </div>
          <div
            class="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1"
          >
            <div class="table-responsive scrollbar-overlay mx-n1 px-1">
              <table class="table table-sm fs-9 mb-0">
                <thead>
                  <tr>
                    <th class="white-space-nowrap fs-9 align-middle ps-0">#</th>
                    <th class="align-middle pe-5">Nom</th>
                    <th class="align-middle pe-5">Email</th>
                    <th class="align-middle text-end">Validation</th>
                    <th class="align-middle text-end">Inscription</th>
                    <th class="align-middle ps-3">Adresse</th>
                    <th class="align-middle text-end">Téléphone</th>
                    <th class="align-middle text-end pe-0">Photo</th>
                    <th class="align-middle text-end pe-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(client, index) in clients"
                    :key="client.email"
                    class="hover-actions-trigger btn-reveal-trigger position-static"
                  >
                    <td class="align-middle ps-0 py-3">{{ index + 1 }}</td>
                    <td class="align-middle white-space-nowrap pe-5 fw-bold text-body-emphasis">
                      {{ client.nom }}
                    </td>
                    <td class="align-middle white-space-nowrap pe-5">
                      <a :href="'mailto:' + client.email" class="fw-semibold">{{ client.email }}</a>
                    </td>
                    <td class="align-middle white-space-nowrap text-end text-body-highlight">
                      {{ client.statut_validation }}
                    </td>
                    <td class="align-middle white-space-nowrap text-end text-body-highlight">
                      {{ formatDate(client.date_inscription) }}
                    </td>
                    <td class="align-middle white-space-nowrap text-body-highlight ps-3">
                      {{ client.adresse }}
                    </td>
                    <td class="align-middle white-space-nowrap text-end text-body-highlight">
                      {{ client.telephone }}
                    </td>
                    <td class="align-middle text-end pe-0">
                      <img
                        :src="client.photo_profil ?? '/assets/img/team/avatar.webp'"
                        alt="photo profil"
                        class="rounded-circle"
                        width="40"
                        height="40"
                      />
                    </td>
                    <td class="align-middle white-space-nowrap text-end text-body-highlight">
                      {{ client.status }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </AppHeader>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/admin/AppHeader.vue'

// Reactive variable to hold client list
const clients = ref([])

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Fetch clients on component mount
onMounted(async () => {
  try {
    const response = await axios.get('/api/clients') // your endpoint
    clients.value = response.data
  } catch (error) {
    console.error('Error fetching clients:', error)
  }
})
</script>
