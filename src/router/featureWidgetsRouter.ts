import { Component } from 'vue'
import { RouteRegistrator } from './RouteRegistrator'

enum featureWidgetsEnum {
  QuillEditor = 'QuillEditor',
}

const featureWidgetsFilesObj = {
  QuillEditor: {
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
