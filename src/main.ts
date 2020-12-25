/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/screensRouter'
import { store, storeKey } from './store'


// Office.onReady(info => {})

createApp(App)
  .use(store, storeKey)
  .use(router)
  .mount('#app') 
