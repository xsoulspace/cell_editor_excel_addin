/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/screensRouter'
import store from './store'

// Office.onReady(info => {})

createApp(App)
  .use(store)
  .use(router)
  .mount('#app') 
