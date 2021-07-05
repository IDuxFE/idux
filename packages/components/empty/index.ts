import type { EmptyComponent } from './src/types'

import Empty from './src/Empty.vue'

const IxEmpty = Empty as unknown as EmptyComponent

export { IxEmpty }

export type { EmptyInstance, EmptyPublicProps as EmptyProps } from './src/types'
