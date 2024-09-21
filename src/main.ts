import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/plugins/i18n'
import { localYup } from '@/plugins/yup'
import './style.css'
import App from './App.vue'
import router from './router/router'
import useFetchDefault from './plugins/useFetch'
import {useAuthStore} from './stores/auth.store'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import "vue3-easy-data-table/dist/style.css"
import VueSweetalert2 from "vue-sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(localYup)
app.component('EasyDataTable',Vue3EasyDataTable)
app.use(useFetchDefault,{
    authStore: useAuthStore(),
    router: router
})
app.use(VueSweetalert2)
window.Swal =  app.config.globalProperties.$swal

app.mount('#app')
