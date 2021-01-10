import { isFormControl } from '../src/typeof'
import { ModelType } from '../src/constant'
import { useFormControl } from '../src/useFormControl'

describe('typeof.ts', () => {
  test('isFormControl work', () => {
    expect(isFormControl(null)).toEqual(false)
    expect(isFormControl({})).toEqual(false)
    expect(isFormControl({ __type: ModelType.Control })).toEqual(true)
    expect(isFormControl(useFormControl())).toEqual(true)
  })
})
