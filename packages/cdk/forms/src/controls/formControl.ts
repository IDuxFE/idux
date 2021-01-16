/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref, UnwrapRef } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors } from '../types'

import { ref, watch } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormControl<T = any> extends AbstractControl<T> {
  /**
   * The ref value for the control.
   */
  readonly valueRef: Ref<UnwrapRef<T> | null>

  private _initValue: T | null = null
  constructor(
    initValue: T | null = null,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    this.valueRef = ref(initValue)
    this._initValue = initValue

    this._watchEffect()
  }

  /**
   * Resets the form control, marking it `unblurred`, and setting the value to initialization value.
   */
  reset(): void {
    this.valueRef.value = this._initValue as any
    this.markAsUnblurred()
  }

  /**
   * Sets a new value for the form control.
   *
   * @param value The new value.
   */
  setValue(value: T | null): void {
    this.valueRef.value = value as any
  }

  /**
   * The aggregate value of the form control.
   */
  getValue(): T | null {
    return this.valueRef.value as T
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
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidationErrors | null> {
    return this._validate()
  }

  private _watchEffect() {
    watch([this.valueRef, this.blurred], () => {
      if (this.trigger === 'change' || (this.trigger === 'blur' && this.blurred.value)) {
        this._validate()
      }
    })

    watch(this.errors, errors => {
      this._status.value = errors ? 'invalid' : 'valid'
    })
  }
}
