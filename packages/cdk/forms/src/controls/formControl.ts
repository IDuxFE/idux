/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors } from '../types'

import { shallowRef, watch } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormControl<T = any> extends AbstractControl<T> {
  constructor(
    private _initValue: T,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    this._valueRef = shallowRef(this._initValue)

    this._initAllStatus()

    this._watchValid()
    this._watchStatus()
  }

  /**
   * Resets the form control, marking it `unblurred`, `pristine`,
   * and setting the value to initialization value.
   */
  reset(): void {
    this._valueRef.value = this._initValue
    this.markAsUnblurred()
    this.markAsPristine()
  }

  /**
   * Sets a new value for the form control.
   *
   * @param value The new value.
   * @param options Configuration options that emits events when the value changes.
   * * `dirty`: Marks it dirty, default is false.
   */
  setValue(value: T, options: { dirty?: boolean } = {}): void {
    this._valueRef.value = value
    if (options.dirty) {
      this.markAsDirty()
    }
  }

  /**
   * The aggregate value of the control.
   */
  getValue(): T {
    return this._valueRef.value
  }

  /**
   * Marks the control as `blurred`.
   */
  markAsBlurred(): void {
    this._blurred.value = true
  }

  /**
   * Marks the control as `unblurred`.
   */
  markAsUnblurred(): void {
    this._blurred.value = false
  }

  /**
   *  Marks the control as `dirty`.
   */
  markAsDirty(): void {
    this._dirty.value = true
  }

  /**
   *  Marks the control as `pristine`.
   */
  markAsPristine(): void {
    this._dirty.value = false
  }

  /**
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidationErrors | null> {
    return this._validate()
  }

  private _watchValid() {
    watch([this._valueRef, this._blurred], ([_, blurred]) => {
      if (this.trigger === 'change' || (this.trigger === 'blur' && blurred)) {
        this._validate()
      }
    })
  }

  private _watchStatus() {
    watch(this._errors, errors => {
      this._status.value = errors ? 'invalid' : 'valid'
    })
  }
}
