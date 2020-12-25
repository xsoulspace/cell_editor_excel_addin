import { RouteRecordRaw } from 'vue-router'

export interface WidgetRouter<W, R, F, E> {
  widgets: W
  routes: R
  routesEnum: E
  files: F
}

export type RouteComponents =
  | RouteRecordRaw['components']
  | { default: RouteRecordRaw['component'] }
