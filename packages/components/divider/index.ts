import type { DividerComponent } from './src/types'

import Divider from './src/Divider.vue'

const IxDivider = Divider as unknown as DividerComponent

export { IxDivider }

export type { DividerInstance, DividerPublicProps as DividerProps, DividerPosition, DividerType } from './src/types'
