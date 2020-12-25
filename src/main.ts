/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { AppRouter } from './router/screensRouter'
// import { store, storeKey } from './store/index'

Office.onReady(info => {})

createApp(App)
  // .use(store, storeKey)
  .use(AppRouter)
  .mount('#app')
