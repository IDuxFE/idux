/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComputedRef, Ref } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidateErrors, ValidateStatus } from '../types'
import type { ArrayElement } from './types'

import { computed, shallowReadonly, shallowRef, toRaw, watch, watchEffect } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormArray<T extends any[] = any[]> extends AbstractControl<T> {
  /**
   * Length of the control array.
   */
  readonly length: ComputedRef<number>

  readonly controls!: Readonly<Ref<AbstractControl<ArrayElement<T>>[]>>

  private _controls: Ref<AbstractControl<ArrayElement<T>>[]>

  constructor(
    /**
     * An array of child controls. Each child control is given an index where it is registered.
     */
    controls: AbstractControl<ArrayElement<T>>[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    controls.forEach(control => control.setParent(this as AbstractControl))
    this._controls = shallowRef(controls)
    ;(this as any).controls = shallowReadonly((this as any)._controls)
    this.length = computed(() => this._controls.value.length)
    this._valueRef = shallowRef(this._calculateValue())

    this._initAllStatus()

    this._watchValid()
    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */
  at(index: number): AbstractControl<ArrayElement<T>> {
    return this._controls.value[index]
  }

  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: AbstractControl<ArrayElement<T>>): void {
    control.setParent(this as AbstractControl)
    const controls = toRaw(this._controls.value)
    this._controls.value = [...controls, control]
  }

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl<ArrayElement<T>>): void {
    control.setParent(this as AbstractControl)
    const controls = toRaw(this._controls.value)
    controls.splice(index, 0, control)
    this._controls.value = [...controls]
  }

  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   */
  removeAt(index: number): void {
    const controls = toRaw(this._controls.value)
    controls.splice(index, 1)
    this._controls.value = [...controls]
  }

  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: AbstractControl<ArrayElement<T>>): void {
    control.setParent(this as AbstractControl)
    const controls = toRaw(this._controls.value)
    controls.splice(index, 1, control)
    this._controls.value = [...controls]
  }

  /**
   * Resets all _controls.value of the form array.
   */
  reset(): void {
    this._controls.value.forEach(control => control.reset())
  }

  /**
   * Sets a new value for the form array.
   *
   * @param value The new value.
   * @param options Configuration options that emits events when the value changes.
   * * `dirty`: Marks ar dirty, default is false.
   */
  setValue(value: Partial<ArrayElement<T>>[], options: { dirty?: boolean } = {}): void {
    value.forEach((item, index) => {
      if (this.at(index)) {
        this.at(index).setValue(item, options)
      }
    })
  }

  /**
   * The aggregate value of the form array.
   */
  getValue(): T {
    return this._controls.value.map(control => control.getValue()) as T
  }

  /**
   * Marks all controls of the form array as `blurred`.
   */
  markAsBlurred(): void {
    this._controls.value.forEach(control => control.markAsBlurred())
  }

  /**
   * Marks all controls of the form array as `unblurred`.
   */
  markAsUnblurred(): void {
    this._controls.value.forEach(control => control.markAsUnblurred())
  }

  /**
   * Marks all controls of the form array as `dirty`.
   */
  markAsDirty(): void {
    this._controls.value.forEach(control => control.markAsDirty())
  }

  /**
   * Marks all controls of the form array as `pristine`.
   */
  markAsPristine(): void {
    this._controls.value.forEach(control => control.markAsPristine())
  }

  /**
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidateErrors | null> {
    this._controls.value.forEach(control => control.validate())
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
        for (const control of controls) {
          const controlStatus = control.status.value
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
      for (const control of controls) {
        if (control.blurred.value) {
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
      for (const control of controls) {
        if (control.dirty.value) {
          dirty = true
          break
        }
      }
      this._dirty.value = dirty
    })
  }

  private _calculateValue() {
    return this._controls.value.map(control => control.getValue()) as T
  }
}
