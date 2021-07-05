import type { HeaderComponent } from './src/types'

import Header from './src/Header'

const IxHeader = Header as unknown as HeaderComponent

export { IxHeader }

export type { HeaderInstance, HeaderPublicProps as HeaderProps } from './src/types'
