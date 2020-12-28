import { Component } from 'vue'
import { RouteRegistrator } from './RouteRegistrator'

enum featureWidgetsEnum {
  QuillEditor = 'QuillEditor',
  AppBar = 'AppBar',
  TextareaEditor = 'TextareaEditor',
  AppSettings = 'AppSettings',
  CellValueSettings = 'CellValueSettings',
}

const featureWidgetsFilesObj = {
  QuillEditor: {
    index: 'index',
  },
  AppBar: {
    index: 'index',
  },
  TextareaEditor: {
    index: 'index',
  },
  AppSettings: {
    index: 'index',
  },
  CellValueSettings: {
    index: 'index',
  },
}

type FeatureWidgets = {
  [widget in featureWidgetsEnum]: Component
}

const featureWidgetsFolder = 'featureWidgets/'
const routeRegistrator = new RouteRegistrator<
  FeatureWidgets,
  typeof featureWidgetsEnum
>(featureWidgetsFolder, featureWidgetsEnum)

export const featureWidgets = routeRegistrator.getWidgetsWithinDirectory({
  requestingFiles: featureWidgetsFilesObj,
})
