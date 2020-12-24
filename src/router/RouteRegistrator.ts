import { deepCopyObj } from '@/functions/deepCopyObj'
import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { RouteComponents, WidgetRouter } from '.'
export class RouteRegistrator<
  W extends { [c: string]: RouteRecordRaw['component'] },
  E
> {
  constructor(public folderPath: string, public filesEnumerator: E) {}
  getWidgets(): WidgetRouter<W, undefined, undefined, undefined> {
    const widgets = {} as W
    for (const fileName of Object.values(this.filesEnumerator)) {
      widgets[fileName as keyof W] = defineAsyncComponent(() =>
        import(`@/${this.folderPath}${fileName}.vue`)
      )
    }
    return {
      widgets,
      routes: undefined,
      files: undefined,
      routesEnum: undefined,
    }
  }
  getWidgetsWithinDirectory<
    F extends { [key in keyof W]: { [key in keyof I]: C } },
    I,
    C
  >({ requestingFiles }: { requestingFiles: F }) {
    const widgets = {} as W
    const files = deepCopyObj(requestingFiles)
    for (const [folderName, requestFiles] of Object.entries(requestingFiles)) {
      for (const fileName of Object.keys(requestFiles)) {
        const widget = defineAsyncComponent(() =>
          import(`@/${this.folderPath}${folderName}/${fileName}.vue`)
        )
        if (fileName == 'index') {
          widgets[folderName as keyof W] = widget
        }
        const folder = files[folderName as keyof W] ?? {}
        folder[fileName as keyof I] = widget
      }
    }
    return { widgets, routes: undefined, files, routesEnum: undefined }
  }
  getWidgetsAndRoutes<RE, R extends { [p: string]: RouteRecordRaw }>({
    routes,
    routesEnum,
  }: {
    routes: R
    routesEnum: RE
  }): WidgetRouter<W, R, undefined, RE> {
    const widgets = {} as W
    for (const rootRoute of Object.values(routes)) {
      const children = rootRoute.children
      if (children) {
        for (const routeChild of children) {
          const routeName = routeChild.name
          if (routeName && typeof routeName == 'string') {
            const widget = defineAsyncComponent(() =>
              import(`@/${this.folderPath}${routeName}.vue`)
            )
            widgets[routeName as keyof W] = widget
            /**
             * @abstract see more at https://next.router.vuejs.org/guide/essentials/named-views.html#nested-named-views
             */
            const components: RouteComponents = routeChild.components ?? {}
            components.default = widget
            routeChild.components = components
          }
        }
      }
    }
    return { widgets, routes, files: undefined, routesEnum }
  }
}
