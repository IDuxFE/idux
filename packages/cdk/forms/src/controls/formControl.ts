/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepReadonly, Ref, UnwrapRef } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors } from '../types'

import { ref, watch } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormControl<T = any> extends AbstractControl<T> {
  /**
   * The ref value for the control.
   */
  readonly valueRef!: DeepReadonly<Ref<UnwrapRef<T> | null>>

  protected _valueRef: Ref<UnwrapRef<T> | null>

  private _initValue: T | null = null

  constructor(
    initValue: T | null = null,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    this._valueRef = ref(initValue)
    this._initValue = initValue

    this._initAllStatus()

    this._watchValid()
    this._watchStatus()
  }

  /**
   * Resets the form control, marking it `unblurred`, `pristine`,
   * and setting the value to initialization value.
   */
  reset(): void {
    this._valueRef.value = this._initValue as any
    this.markAsUnblurred()
    this.markAsPristine()
  }

  /**
   * Sets a new value for the form control, marking it `dirty`.
   *
   * @param value The new value.
   */
  setValue(value: T | null): void {
    this._valueRef.value = value as any
    this.markAsDirty()
  }

  /**
   * The aggregate value of the form control.
   */
  getValue(): T | null {
    return this._valueRef.value as T
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
