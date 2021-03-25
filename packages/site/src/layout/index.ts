import type { App } from 'vue'

import LayoutHeader from './header/Index.vue'
import LayoutSideNav from './SideNav.vue'

const components = [LayoutHeader, LayoutSideNav]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default { install }
