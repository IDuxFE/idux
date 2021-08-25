import type { InputComponent } from './src/types'

import Input from './src/Input'

const IxInput = Input as unknown as InputComponent

export { IxInput }

export type { InputInstance, InputPublicProps as InputProps } from './src/types'

export { commonProps as ɵCommonProps } from './src/types'
export { useCommonBindings as ɵUseCommonBindings } from './src/useCommonBindings'
