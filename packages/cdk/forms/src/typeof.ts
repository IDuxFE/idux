import { isNonNil } from '@idux/cdk/utils'
import { ModelType } from './constant'
import { FormControl } from './useFormControl'

export const isFormControl = (val: unknown): val is FormControl => {
  return isNonNil(val) && (val as { __type: string }).__type === ModelType.Control
}
