import type { App } from 'vue'

import GlobalCodeBox from './CodeBox.vue'
import GlobalColors from './Colors.vue'

const components = [GlobalCodeBox, GlobalColors]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default { install }
