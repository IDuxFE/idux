import type { App } from 'vue'

import IxAffix from './src/Affix.vue'

IxAffix.install = (app: App): void => {
  app.component(IxAffix.name, IxAffix)
}

export { IxAffix }

export type { AffixInstance, AffixProps, AffixOffset, AffixDirection } from './src/types'
