/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidateErrors, ValidateStatus } from '../types'
import type { GroupControls } from './types'

import { shallowReadonly, shallowRef, toRaw, watch, watchEffect } from 'vue'
import { hasOwnProperty } from '@idux/cdk/utils'
import { AbstractControl } from './abstractControl'

export class FormGroup<T extends Record<string, any> = Record<string, any>> extends AbstractControl<T> {
  readonly controls!: Readonly<Ref<GroupControls<T>>>

  private _controls: Ref<GroupControls<T>>

  constructor(
    /**
     * A collection of child controls. The key for each child is the name under which it is registered.
     */
    controls: GroupControls<T>,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    this._controls = shallowRef(controls)
    ;(this as any).controls = shallowReadonly((this as any)._controls)
    this._forEachChild(control => control.setParent(this as AbstractControl))
    this._valueRef = shallowRef(this._calculateValue())

    this._initAllStatus()

    this._watchValid()
    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  /**
   * Add a control to this form group.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   */
  addControl<K extends OptionalKeys<T>>(name: K, control: AbstractControl<T[K]>): void {
    control.setParent(this as AbstractControl)
    const controls = toRaw(this._controls.value)
    if (hasOwnProperty(controls, name as string)) {
      return
    }
    controls[name] = control
    this._controls.value = { ...controls }
  }

  /**
   * Remove a control from this form group.
   *
   * @param name The control name to remove from the collection
   */
  removeControl<K extends OptionalKeys<T>>(name: K): void {
    const controls = toRaw(this._controls.value)
    delete controls[name]
    this._controls.value = { ...controls }
  }

  /**
   * Replace an existing control.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   */
  setControl<K extends keyof T>(name: K, control: AbstractControl<T[K]>): void {
    control.setParent(this as AbstractControl)
    const controls = toRaw(this._controls.value)
    controls[name] = control
    this._controls.value = { ...controls }
  }

  /**
   * Resets all controls of the form group.
   */
  reset(): void {
    this._forEachChild(control => control.reset())
  }

  /**
   * Sets a new value for the form group.
   *
   * @param value The new value.
   * @param options Configuration options that emits events when the value changes.
   * * `dirty`: Marks ar dirty, default is false.
   */
  setValue(value: Partial<T>, options: { dirty?: boolean } = {}): void {
    Object.keys(value).forEach(key => {
      this._controls.value[key as keyof T]!.setValue((value as any)[key], options)
    })
  }

  /**
   * The aggregate value of the form control.
   */
  getValue(): T {
    const value = {} as T
    this._forEachChild((control, key) => {
      value[key] = control.getValue()
    })
    return value
  }

  /**
   * Marks all controls of the form group as `blurred`.
   */
  markAsBlurred(): void {
    this._forEachChild(control => control.markAsBlurred())
  }

  /**
   * Marks all controls of the form group as `unblurred`.
   */
  markAsUnblurred(): void {
    this._forEachChild(control => control.markAsUnblurred())
  }

  /**
   * Marks all controls of the form group as `dirty`.
   */
  markAsDirty(): void {
    this._forEachChild(control => control.markAsDirty())
  }

  /**
   * Marks all controls of the form group as `pristine`.
   */
  markAsPristine(): void {
    this._forEachChild(control => control.markAsPristine())
  }

  /**
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidateErrors | null> {
    this._forEachChild(control => control.validate())
    return this._validate()
  }

  private _watchValid() {
    watch([this._valueRef, this._blurred], ([_, blurred]) => {
      if (this.trigger === 'change' || (this.trigger === 'blur' && blurred)) {
        this._validate()
      }
    })
  }

  private _watchValue() {
    watchEffect(() => {
      this._valueRef.value = this._calculateValue()
    })
  }

  private _watchStatus() {
    watchEffect(() => {
      let status: ValidateStatus = this._errors.value ? 'invalid' : 'valid'
      if (status === 'valid') {
        const controls = this._controls.value
        for (const key in controls) {
          const controlStatus = controls[key]!.status.value
          if (controlStatus === 'invalid') {
            status = 'invalid'
            break
          } else if (controlStatus === 'validating') {
            status = 'validating'
          }
        }
      }
      this._status.value = status
    })
  }

  private _watchBlurred() {
    watchEffect(() => {
      let blurred = false
      const controls = this._controls.value
      for (const key in controls) {
        if (controls[key]!.blurred.value) {
          blurred = true
          break
        }
      }
      this._blurred.value = blurred
    })
  }

  private _watchDirty() {
    watchEffect(() => {
      let dirty = false
      const controls = this._controls.value
      for (const key in controls) {
        if (controls[key]!.dirty.value) {
          dirty = true
          break
        }
      }
      this._dirty.value = dirty
    })
  }

  private _calculateValue() {
    const value = {} as T
    const controls = this._controls.value
    Object.keys(controls).forEach(key => {
      value[key as keyof T] = controls[key as keyof T]!.getValue()
    })

    return value
  }

  private _forEachChild(cb: (v: AbstractControl, k: keyof T) => void): void {
    const controls = this._controls.value
    Object.keys(controls).forEach(key => cb(controls[key as keyof T]!, key as keyof T))
  }
}
