import { flushPromises } from '@vue/test-utils'
import { FormArray } from '../src/controls/formArray'
import { FormControl } from '../src/controls/formControl'
import { FormGroup } from '../src/controls/formGroup'
import { ValidationErrors } from '../src/types'
import { Validators } from '../src/validators'

interface BasicGroup {
  control: string
  array: string[]
  group: {
    control: string
  }
}

const newFormGroup = () =>
  new FormGroup<BasicGroup>({
    control: new FormControl(''),
    array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
    group: new FormGroup({
      control: new FormControl(''),
    }),
  })

const basicValue = { control: '', array: ['', ''], group: { control: '' } }

describe('formArray.ts', () => {
  describe('basic work', () => {
    let array: FormArray<BasicGroup[]>

    beforeEach(() => {
      array = new FormArray([newFormGroup()])
    })

    test('push work', async () => {
      const group = newFormGroup()

      expect(array.length).toEqual(1)
      expect(array.getValue()).toEqual([basicValue])

      array.push(group)

      expect(array.length).toEqual(2)
      expect(array.at(0)).not.toEqual(group)
      expect(array.at(1)).toEqual(group)
      expect(array.getValue()).toEqual([basicValue, basicValue])

      group.markAsBlurred()
      await flushPromises()

      expect(array.blurred.value).toEqual(true)
    })

    test('insert work', async () => {
      const group1 = newFormGroup()
      const group2 = newFormGroup()

      expect(array.length).toEqual(1)
      expect(array.getValue()).toEqual([basicValue])

      array.insert(0, group1)

      expect(array.length).toEqual(2)
      expect(array.at(0)).toEqual(group1)
      expect(array.getValue()).toEqual([basicValue, basicValue])

      array.insert(0, group2)

      expect(array.length).toEqual(3)
      expect(array.at(0)).toEqual(group2)
      expect(array.getValue()).toEqual([basicValue, basicValue, basicValue])

      group1.markAsBlurred()
      await flushPromises()
      expect(array.blurred.value).toEqual(true)
    })

    test('removeAt work', async () => {
      expect(array.length).toEqual(1)
      expect(array.getValue()).toEqual([basicValue])

      array.removeAt(1)

      expect(array.length).toEqual(1)
      expect(array.getValue()).toEqual([basicValue])

      const group = array.at(0)
      array.removeAt(0)
      expect(array.length).toEqual(0)
      expect(array.getValue()).toEqual([])

      group.markAsBlurred()
      await flushPromises()
      expect(array.blurred.value).toEqual(false)
    })

    test('setControl work', async () => {
      expect(array.getValue()).toEqual([basicValue])
      const group = new FormGroup<BasicGroup>({
        control: new FormControl('test'),
        array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
        group: new FormGroup({
          control: new FormControl(''),
        }),
      })
      array.setControl(0, group)

      expect(array.getValue()).toEqual([{ ...basicValue, control: 'test' }])

      group.markAsBlurred()
      await flushPromises()
      expect(array.blurred.value).toEqual(true)
    })

    test('reset work', async () => {
      expect(array.getValue()).toEqual([basicValue])

      array.setValue([{ control: 'test' }])
      array.markAsBlurred()
      await flushPromises()

      expect(array.getValue()).toEqual([{ ...basicValue, control: 'test' }])
      expect(array.blurred.value).toEqual(true)

      array.reset()
      await flushPromises()

      expect(array.getValue()).toEqual([basicValue])
      expect(array.blurred.value).toEqual(false)
    })

    test('setValue and getValue work', () => {
      expect(array.getValue()).toEqual([basicValue])

      array.setValue([{ control: 'test' }])

      expect(array.getValue()).toEqual([{ ...basicValue, control: 'test' }])

      array.setValue([{ control: 'test1' }, { control: 'test2' }])

      expect(array.getValue()).toEqual([{ ...basicValue, control: 'test1' }])
    })

    test('markAsBlurred and markAsUnblurred work', async () => {
      array.markAsBlurred()
      await flushPromises()

      expect(array.blurred.value).toEqual(true)

      array.markAsUnblurred()
      await flushPromises()

      expect(array.blurred.value).toEqual(false)
    })

    test('markAsDirty and markAsPristine work', async () => {
      array.markAsDirty()
      await flushPromises()

      expect(array.dirty.value).toEqual(true)

      array.markAsPristine()
      await flushPromises()

      expect(array.dirty.value).toEqual(false)
    })

    test('validate work', async () => {
      expect(await array.validate()).toBeNull()

      const _validator = (_: unknown) => ({ test: { message: '' } } as ValidationErrors)

      array.setValidator(_validator)

      expect(await array.validate()).toEqual({ test: { message: '' } })
    })

    test('get work', async () => {
      const [group] = array.controls

      expect(array.get('0')).toEqual(group)
      expect(array.get([0])).toEqual(group)

      expect(array.get(undefined as never)).toBeNull()
      expect(array.get('1')).toBeNull()
      expect(array.get([1])).toBeNull()
    })
  })

  describe('trigger work', () => {
    let array: FormArray<BasicGroup[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _validator = (value: any) => {
      return value[0].control === 'test' ? null : ({ test: { message: '' } } as ValidationErrors)
    }

    test('default change work', async () => {
      array = new FormArray([newFormGroup()], { validators: _validator })

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)

      array.setValue([{ control: 'test' }])
      await flushPromises()

      expect(array.invalid.value).toEqual(false)
      expect(array.hasError('test')).toEqual(false)

      array.setValue([{ control: '1234' }])
      await flushPromises()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)
    })

    test('blur trigger validate work', async () => {
      array = new FormArray([newFormGroup()], { trigger: 'blur', validators: _validator })

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)

      array.setValue([{ control: 'test' }])
      await flushPromises()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)

      array.markAsBlurred()
      await flushPromises()

      expect(array.invalid.value).toEqual(false)
      expect(array.hasError('test')).toEqual(false)

      array.setValue([{ control: '1234' }])
      await flushPromises()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)
    })

    test('submit trigger validate work', async () => {
      const _asyncValidator = (_: unknown) => Promise.resolve({ async: { message: 'async' } } as ValidationErrors)
      array = new FormArray(
        [
          new FormGroup<BasicGroup>({
            control: new FormControl('', Validators.required),
            array: new FormArray<string[]>([new FormControl(''), new FormControl('')]),
            group: new FormGroup({
              control: new FormControl('', { asyncValidators: _asyncValidator }),
            }),
          }),
        ],
        { trigger: 'submit', validators: _validator },
      )

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)
      expect(array.hasError('required', [0, 'control'])).toEqual(true)
      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(false)

      await flushPromises()

      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(true)

      array.setValue([{ control: 'test' }])
      array.markAsBlurred()
      await flushPromises()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)
      expect(array.hasError('required', [0, 'control'])).toEqual(true)
      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(true)

      await array.validate()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(false)
      expect(array.hasError('required', [0, 'control'])).toEqual(false)
      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(true)

      array.setValue([{ control: '1234' }])
      await flushPromises()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(false)
      expect(array.hasError('required', [0, 'control'])).toEqual(false)
      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(true)

      await array.validate()

      expect(array.invalid.value).toEqual(true)
      expect(array.hasError('test')).toEqual(true)
      expect(array.hasError('required', [0, 'control'])).toEqual(false)
      expect(array.hasError('async', [0, 'group', 'control'])).toEqual(true)
    })
  })
})
