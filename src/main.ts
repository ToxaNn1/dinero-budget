import { createApp } from 'vue'
import '@/assets/styles/main.scss'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import VChart from 'vue-echarts'
import 'echarts'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { ToastOptions } from '@/plugins/toast-notification'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '@/plugins/firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { i18n } from '@/plugins/i18n/i18n'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import 'vuetify/styles'
import { vuetifyConfig } from '@/plugins/vuetify'
import { fontAwesomeIcons } from '@/assets/icons/font-awesome'

const pinia = createPinia()
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

library.add(...fontAwesomeIcons)
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(Toast, ToastOptions)
app.use(vuetifyConfig)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.component('VChart', VChart)
app.mount('#app')
