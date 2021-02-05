/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WatchStopHandle } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors, ValidationStatus } from '../types'
import type { ArrayElement } from './types'

import { shallowRef, watch, watchEffect } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormArray<T extends any[] = any[]> extends AbstractControl<T> {
  /**
   * Length of the control array.
   */
  get length(): number {
    return this.controls.length
  }

  private _valueWatchStopHandle: WatchStopHandle | null = null
  private _statusWatchStopHandle: WatchStopHandle | null = null
  private _blurredWatchStopHandle: WatchStopHandle | null = null
  private _dirtyWatchStopHandle: WatchStopHandle | null = null

  constructor(
    /**
     * An array of child controls. Each child control is given an index where it is registered.
     */
    public readonly controls: AbstractControl<ArrayElement<T>>[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    controls.forEach(control => control.setParent(this as AbstractControl))
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
    return this.controls[index]
  }

  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: AbstractControl<ArrayElement<T>>): void {
    this.controls.push(control)
    this._registerControl(control)
    this._refreshValueAndWatch()
  }

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl<ArrayElement<T>>): void {
    this.controls.splice(index, 0, control)
    this._registerControl(control)
    this._refreshValueAndWatch()
  }

  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   */
  removeAt(index: number): void {
    this.controls.splice(index, 1)
    this._refreshValueAndWatch()
  }

  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: AbstractControl<ArrayElement<T>>): void {
    this.controls.splice(index, 1, control)
    this._registerControl(control)
    this._refreshValueAndWatch()
  }

  /**
   * Resets all controls of the form array.
   */
  reset(): void {
    this.controls.forEach(control => control.reset())
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
    return this.controls.map(control => control.getValue()) as T
  }

  /**
   * Marks all controls of the form array as `blurred`.
   */
  markAsBlurred(): void {
    this.controls.forEach(control => control.markAsBlurred())
  }

  /**
   * Marks all controls of the form array as `unblurred`.
   */
  markAsUnblurred(): void {
    this.controls.forEach(control => control.markAsUnblurred())
  }

  /**
   * Marks all controls of the form array as `dirty`.
   */
  markAsDirty(): void {
    this.controls.forEach(control => control.markAsDirty())
  }

  /**
   * Marks all controls of the form array as `pristine`.
   */
  markAsPristine(): void {
    this.controls.forEach(control => control.markAsPristine())
  }

  /**
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidationErrors | null> {
    this.controls.forEach(control => control.validate())
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
    if (this._valueWatchStopHandle) {
      this._valueWatchStopHandle()
    }
    this._valueWatchStopHandle = watchEffect(() => {
      this._valueRef.value = this._calculateValue()
    })
  }

  private _watchStatus() {
    if (this._statusWatchStopHandle) {
      this._statusWatchStopHandle()
    }
    this._statusWatchStopHandle = watchEffect(() => {
      let status: ValidationStatus = this._errors.value ? 'invalid' : 'valid'
      if (status === 'valid') {
        for (const control of this.controls) {
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
    if (this._blurredWatchStopHandle) {
      this._blurredWatchStopHandle()
    }
    this._blurredWatchStopHandle = watchEffect(() => {
      let blurred = false
      for (const control of this.controls) {
        if (control.blurred.value) {
          blurred = true
          break
        }
      }
      this._blurred.value = blurred
    })
  }

  private _watchDirty() {
    if (this._dirtyWatchStopHandle) {
      this._dirtyWatchStopHandle()
    }
    this._dirtyWatchStopHandle = watchEffect(() => {
      let dirty = false
      for (const control of this.controls) {
        if (control.dirty.value) {
          dirty = true
          break
        }
      }
      this._dirty.value = dirty
    })
  }

  private _calculateValue() {
    return this.controls.map(control => control.getValue()) as T
  }

  private _refreshValueAndWatch() {
    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  private _registerControl(control: AbstractControl<ArrayElement<T>>) {
    control.setParent(this as AbstractControl)
  }
}
