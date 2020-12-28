import { Component } from 'vue'
import { RouteRegistrator } from './RouteRegistrator'

enum uiWidgetsEnum {
  DialogPopup = 'DialogPopup',
}

const uiWidgetsFilesObj = {
  DialogPopup: {
    index: 'index',
  },
}

type UiWidgets = {
  [widget in uiWidgetsEnum]: Component
}

const uiWidgetsFolder = 'uiWidgets/'
const routeRegistrator = new RouteRegistrator<UiWidgets, typeof uiWidgetsEnum>(
  uiWidgetsFolder,
  uiWidgetsEnum
)

export const uiWidgets = routeRegistrator.getWidgetsWithinDirectory({
  requestingFiles: uiWidgetsFilesObj,
})
