/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import AppProvider from './AppProvider.vue'
import './registerServiceWorker'
import { AppRouter } from './router/screensRouter'
import { store, storeKey } from './store/index'

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

createApp(AppProvider)
  .use(store, storeKey)
  .use(AppRouter)
  .mount('#app')
