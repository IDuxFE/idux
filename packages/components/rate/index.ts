import type { RateComponent } from './src/types'

import Rate from './src/Rate.vue'

const IxRate = Rate as unknown as RateComponent

export { IxRate }

export type { RateInstance, RatePublicProps as RateProps } from './src/types'
