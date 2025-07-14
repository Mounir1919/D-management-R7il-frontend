import { createRouter, createWebHistory } from 'vue-router'

// Template views
import ContactPage from '@/views/template/contact.vue'
import HomePage from '@/views/template/Home.vue'
import PresentationPage from '@/views/template/presentation.vue'
import TransporteurPage from '@/views/template/transporteur.vue'

// Dashboard client views

import Dashboard from '@/views/DashboardC/Dashboard.vue'
import login_client from '@/views/DashboardC/Login.vue'
import register_client from '@/views/DashboardC/Register.vue'
import ResetPassword from '@/views/DashboardC/ResetPassword.vue'
import ForgotPassword from '@/views/DashboardC/ForgotPassword.vue'
import client from '@/views/DashboardC/Profile.vue'

//admin views
import AdminDashboard from '@/views/admin/DashboardAdmin.vue'
import AdminLogin from '@/views/admin/Login.vue'
const routes = [
  // Public/template views
  { path: '/', component: HomePage },
  { path: '/presentation', component: PresentationPage },
  { path: '/transporteur', component: TransporteurPage },
  { path: '/contact', component: ContactPage },

  // Dashboard client/template views

  { path: '/dashboard_client', component: Dashboard },
  { path: '/login_client', component: login_client },
  { path: '/register_client', component: register_client },
  { path: '/reset_password', component: ResetPassword },
  { path: '/forgot_password_client', component: ForgotPassword },
  { path: '/edit_client', component: client },
  {
    path: '/google-login-success',
    name: 'GoogleLoginSuccess',
    component: () => import('@/views/GoogleLoginSuccess.vue'),
  },
  //Admin routes
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true, // Only allow logged-in users
      requiresAdmin: true, //   // Only allow admin users
    },
  },
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
