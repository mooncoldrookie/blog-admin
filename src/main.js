import { useComponents } from '@/plugins/components'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { store } from '@/stores'
import { MotionPlugin } from '@vueuse/motion'
import MIcon from '@/components/MIcon'
import { Modal as MModal } from '@/plugins/modal'
import '@/utils/dayjs'

import 'normalize.css'
import '@/styles/main.scss'
import './tailwind.scss'

const app = createApp(App)

app.component('MIcon', MIcon)
useComponents(app)
app.use(MotionPlugin).use(MModal)

app.use(router).use(store)
app.mount('#app')
