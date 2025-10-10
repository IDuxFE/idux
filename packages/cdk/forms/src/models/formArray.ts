/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, watchEffect } from 'vue'

import { AbstractControl } from './abstractControl'
import { type AsyncValidatorFn, type ValidateStatus, type ValidatorFn, type ValidatorOptions } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FormArray<T = any> extends AbstractControl<T[]> {
  /**
   * Length of the control array.
   */
  readonly length: ComputedRef<number>

  constructor(
    /**
     * An array of child controls. Each child control is given an index where it is registered.
     */
    controls: AbstractControl<T>[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(controls, validatorOrOptions, asyncValidator)

    this.length = computed(() => this._controls.value.length)

    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  setValue(
    value: T extends object ? Partial<T>[] : T[],
    options: { dirty?: boolean; blur?: boolean; validate?: boolean },
  ): void {
    value.forEach((item, index) => {
      const control = this.at(index)
      if (control) {
        control.setValue(item!, options)
      }
    })
    if (options?.validate) {
      this._validate()
    }
  }

  getValue(options: { skipDisabled?: boolean } = {}): T[] {
    const { skipDisabled } = options
    const controls = this._controls.value as AbstractControl<T>[]
    return controls
      .filter(control => !skipDisabled || !control.disabled.value)
      .map(control => control.getValue(options))
  }

  protected _calculateInitValue(): T[] {
    return this.getValue()
  }

  protected _forEachControls(cb: (v: AbstractControl, k: number) => void): void {
    this._controls.value.forEach(cb)
  }

  protected _find(name: string | number): AbstractControl<T> | undefined {
    return this.at(name as number)
  }

  /**
   * Get the control at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */
  at(index: number): AbstractControl<T> | undefined {
    return this._controls.value[index]
  }

  /**
   * Insert a new control at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: AbstractControl<T>): void {
    control.setParent(this as AbstractControl)
    this._controls.value = [...this._controls.value, control]
  }

  /**
   * Insert a new control at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl<T>): void {
    control.setParent(this as AbstractControl)
    const controls = [...this._controls.value]
    controls.splice(index, 0, control)
    this._controls.value = controls
  }

  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   */
  removeAt(index: number): void {
    const controls = [...this._controls.value]
    controls.splice(index, 1)
    this._controls.value = controls
  }
  /**
   * Empties out the controls.
   */
  clearControls(): void {
    this._controls.value = []
  }

  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The control to replace the existing control
   */
  setControl(index: number, control: AbstractControl<T>): void {
    control.setParent(this as AbstractControl)
    const controls = [...this._controls.value]
    controls.splice(index, 1, control)
    this._controls.value = controls
  }

  private _watchValue() {
    watchEffect(() => {
      this._valueRef.value = this.getValue()
    })
  }

  private _watchStatus() {
    watchEffect(() => {
      this._status.value = this._errors.value ? 'invalid' : 'valid'
    })

    watchEffect(() => {
      let status: ValidateStatus = 'valid'
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
      this._controlsStatus.value = status
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
}
