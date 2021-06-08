import type { ComputedRef, InjectionKey } from 'vue'
import type { ListGridProps } from './types'

export const listToken: InjectionKey<ComputedRef<ListGridProps | undefined>> = Symbol('list')
