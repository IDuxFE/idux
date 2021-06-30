import type { ResultComponent } from './src/types'

import Result from './src/Result.vue'

const IxResult = Result as unknown as ResultComponent

export { IxResult }

export type { ResultInstance, ResultPublicProps as ResultProps, ResultStatus } from './src/types'
