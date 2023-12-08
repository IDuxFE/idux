/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { watch } from 'vue'

import { AbstractControl } from './abstractControl'
import { type AsyncValidatorFn, type ValidatorFn, type ValidatorOptions } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FormControl<T = any> extends AbstractControl<T> {
  constructor(
    private _initValue?: T,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(undefined, validatorOrOptions, asyncValidator, _initValue)

    this._watchStatus()
  }

  setValue(value: T, options: { dirty?: boolean; blur?: boolean } = {}): void {
    this._valueRef.value = value
    if (options.dirty) {
      this.markAsDirty()
    }
    if (options.blur) {
      this.markAsBlurred()
    }
  }

  getValue(): T {
    return this._valueRef.value
  }

  protected _calculateInitValue(): T {
    return this._initValue as T
  }

  protected _forEachControls(_: (v: AbstractControl, k: never) => void): void {}

  protected _find(_: string | number): AbstractControl<T> | undefined {
    return undefined
  }

  private _watchStatus() {
    watch(this._errors, errors => {
      this._status.value = errors ? 'invalid' : 'valid'
    })
  }
}
