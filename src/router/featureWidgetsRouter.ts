import { Component } from 'vue'
import { RouteRegistrator } from './RouteRegistrator'

enum featureWidgetsEnum {
  SheetWidget = 'SheetWidget',
  SheetsWidget = 'SheetsWidget',
}

const featureWidgetsFilesObj = {
  SheetWidget: {
    index: 'index',
  },
  SheetsWidget: {
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
