import type { CheckboxGroupProps } from './types'

import { InjectionKey } from 'vue'

import { Subject } from '@idux/cdk/subject'

export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupProps> = Symbol()

export type SubjectType = string

export const subjectInjectKey: InjectionKey<Subject<SubjectType>> = Symbol()
