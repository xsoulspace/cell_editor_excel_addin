/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { AppRouter } from './router/screensRouter'
// import { store, storeKey } from './store/index'

const addOfficeScript = () => {
  if (document.getElementById('office')) return // was already loaded
  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js'
  scriptTag.id = 'office'
  document.getElementsByTagName('head')[0].appendChild(scriptTag)
}

const infoGlobal = window.sessionStorage['hostInfoValue']
if (infoGlobal != null) {
  addOfficeScript()
  Office.onReady(async context => context)
}

createApp(App)
  // .use(store, storeKey)
  .use(AppRouter)
  .mount('#app')
