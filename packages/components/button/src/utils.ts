import type { ButtonGroupProps } from './types'

import { InjectionKey } from 'vue'

export const buttonToken: InjectionKey<ButtonGroupProps> = Symbol()
