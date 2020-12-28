/// <reference types="@types/office-js" />
import '@/uiStyle/style.scss'
import { createApp } from 'vue'
import AppProvider from './AppProvider.vue'
import './registerServiceWorker'
import { AppRouter } from './router/screensRouter'
const removeOfficeScript = () => {
  const officeScript = document.getElementById('office')
  if (officeScript == null) return
  officeScript.remove()
}
export const getIsInExcelApp = (): boolean => {
  const infoGlobal = window.sessionStorage['hostInfoValue']
  return infoGlobal != null
}
const main = () => {
  if (getIsInExcelApp()) {
    Office.onReady(async context => context).then(() => {
      createApp(AppProvider)
        .use(AppRouter)
        .mount('#app')
    })
  } else {
    removeOfficeScript()
    createApp(AppProvider)
      .use(AppRouter)
      .mount('#app')
  }
}
const addOfficeScript = () => {
  if (document.getElementById('office')) return // was already loaded
  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://appsforoffice.microsoft.com/lib/1/hosted/office.js'
  scriptTag.id = 'office'
  scriptTag.async = false
  document.getElementsByTagName('head')[0].appendChild(scriptTag)
  scriptTag.addEventListener('load', main)
}

addOfficeScript()
