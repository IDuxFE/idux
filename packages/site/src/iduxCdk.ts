import type { App, Directive } from 'vue'

import { IxPortal } from '@idux/cdk/portal'

import { clickOutside } from '@idux/cdk/click-outside'

const components = [IxPortal]

const directives: Record<string, Directive> = {
  clickOutside,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

export default { install }
