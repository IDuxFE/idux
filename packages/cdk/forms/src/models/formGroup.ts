/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { watchEffect } from 'vue'

import { hasOwnProperty } from '@idux/cdk/utils'

import { AbstractControl, type GroupControls, type OptionalKeys } from './abstractControl'
import { type AsyncValidatorFn, type ValidateStatus, type ValidatorFn, type ValidatorOptions } from '../types'

export class FormGroup<T extends object = object> extends AbstractControl<T> {
  constructor(
    /**
     * A collection of child controls, it's an object.
     */
    controls: GroupControls<T>,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(controls, validatorOrOptions, asyncValidator)

    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  setValue(value: Partial<T>, options?: { dirty?: boolean; blur?: boolean }): void {
    const controls = this._controls.value
    ;(Object.keys(value) as Array<keyof T>).forEach(key => {
      const control = controls[key]
      if (control) {
        control.setValue(value[key]!, options)
      }
    })
  }

  getValue(options: { skipDisabled?: boolean } = {}): T {
    const { skipDisabled } = options
    const value = {} as T
    this._forEachControls((control, key) => {
      if (skipDisabled && control.disabled.value) {
        return
      }
      value[key] = control.getValue(options)
    })
    return value
  }

  protected _calculateInitValue(): T {
    return this.getValue()
  }

  protected _forEachControls(cb: (v: AbstractControl, k: keyof T) => void): void {
    const controls = this._controls.value
    ;(Object.keys(controls) as Array<keyof T>).forEach(key => cb(controls[key], key))
  }

  protected _find(name: string | number): AbstractControl<T> | undefined {
    const controls = this._controls.value
    return hasOwnProperty(controls, name) ? controls[name] : undefined
  }

  /**
   * Add a control to this form group.
   *
   * @param key The control's key to add to the collection
   * @param control Provides the control for the given key
   */
  addControl<K extends OptionalKeys<T>>(key: K, control: AbstractControl<T[K]>): void {
    const controls = { ...this._controls.value }
    if (hasOwnProperty(controls, key as string)) {
      return
    }
    control.setParent(this)
    controls[key] = control
    this._controls.value = controls
  }

  /**
   * Remove a control from this form group.
   *
   * @param key The control's key to remove from the collection
   */
  removeControl<K extends OptionalKeys<T>>(key: K): void {
    const controls = { ...this._controls.value }
    delete controls[key]
    this._controls.value = controls
  }

  /**
   * Replace an existing control.
   *
   * @param key The control's key to replace in the collection
   * @param control Provides the control for the given key
   */
  setControl<K extends keyof T>(key: K, control: AbstractControl<T[K]>): void {
    control.setParent(this)
    const controls = { ...this._controls.value }
    controls[key] = control
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
      for (const key in controls) {
        if (!hasOwnProperty(controls, key)) {
          continue
        }
        const controlStatus = controls[key].status.value
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
      for (const key in controls) {
        if (!hasOwnProperty(controls, key)) {
          continue
        }
        if (controls[key].blurred.value) {
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
        if (!hasOwnProperty(controls, key)) {
          continue
        }
        if (controls[key].dirty.value) {
          dirty = true
          break
        }
      }
      this._dirty.value = dirty
    })
  }
}
