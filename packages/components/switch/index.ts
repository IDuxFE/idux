import type { SwitchComponent } from './src/types'

import Switch from './src/Switch.vue'

const IxSwitch = Switch as unknown as SwitchComponent

export { IxSwitch }

export type { SwitchInstance, SwitchPublicProps as SwitchProps } from './src/types'
