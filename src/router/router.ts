import {createRouter, createWebHistory} from 'vue-router'
import guest from '@/middleware/guest'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/middleware/middlewarePipeline'
import {useAuthStore} from "@/stores/auth.store"

import {i18n} from '@/plugins/i18n.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/components/private/Home.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'BasicLayout',
        title: 'heavy_mogul'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/components/public/auth/Login.vue'),
      meta: {
        middleware: [
          guest
        ],
        layout: 'AppLayout',
        title: 'login'
      }
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('../components/private/profile/Index.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'BasicLayout',
        title: 'profile'
      }
    },
    {
      name: 'logistic',
      path: '/logistic',
      component: () => import('../components/private/logistic/Index.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'BasicLayout',
        title: 'logistic'
      }
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/NotFound.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'AppLayout',
        title: 'not_found'
      }
    }
  ]
})

router.beforeEach(async (to, from, next): Promise<void> => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store: useAuthStore()
  }
  const pageTitle = to.meta.title ? i18n.global.t(`routes.${to.meta.title}`) : i18n.global.t('heavy_mogul');

  // update page title
  document.title = pageTitle;

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
