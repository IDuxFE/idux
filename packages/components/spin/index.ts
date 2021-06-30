import type { SpinComponent } from './src/types'

import Spin from './src/Spin.vue'

const IxSpin = Spin as unknown as SpinComponent

export { IxSpin }

export type { SpinInstance, SpinPublicProps as SpinProps } from './src/types'
