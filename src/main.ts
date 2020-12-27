/// <reference types="@types/office-js" />

import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import AppProvider from './AppProvider.vue'
import './registerServiceWorker'
import { AppRouter } from './router/screensRouter'

const addOfficeScript = () => {
  if (document.getElementById('office')) return // was already loaded
  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js'
  scriptTag.id = 'office'
  document.getElementsByTagName('head')[0].appendChild(scriptTag)
}
export const getIsInExcelApp = (): boolean => {
  const infoGlobal = window.sessionStorage['hostInfoValue']
  return infoGlobal != null
}
if (getIsInExcelApp()) {
  addOfficeScript()
  Office.onReady(async context => context)
}

createApp(AppProvider)
  .use(AppRouter)
  .mount('#app')
