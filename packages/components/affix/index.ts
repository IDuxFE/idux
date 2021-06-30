import type { AffixComponent } from './src/types'

import Affix from './src/Affix.vue'

const IxAffix = Affix as unknown as AffixComponent

export { IxAffix }

export type { AffixInstance, AffixPublicProps as AffixProps, AffixOffset, AffixDirection } from './src/types'
