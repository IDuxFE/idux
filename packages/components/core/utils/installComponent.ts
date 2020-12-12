import type { App, DefineComponent } from 'vue'

export const installComponent = (component: DefineComponent) => {
  return (app: App): void => {
    app.component(component.name, component)
  }
}
