/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Ref, UnwrapRef, WatchStopHandle } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors, ValidationStatus } from '../types'

import { ref, watch, watchEffect } from 'vue'
import { hasOwnProperty } from '@idux/cdk/utils'
import { AbstractControl } from './abstractControl'

export class FormGroup<T = Record<string, any>> extends AbstractControl<T> {
  /**
   * The ref value for the form group.
   */
  readonly valueRef: Ref<Partial<Record<keyof T, Ref<UnwrapRef<T>>>>>

  private _statusWatchStopHandle: WatchStopHandle | null = null
  private _blurredWatchStopHandle: WatchStopHandle | null = null

  constructor(
    public controls: Partial<Record<keyof T, AbstractControl>>,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    this._forEachChild(control => control.setParent(this as any))
    this.valueRef = ref(this._calculateValue(controls)) as Ref<Partial<Record<keyof T, Ref<UnwrapRef<T>>>>>

    this._watchValid()
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Add a control to this form group.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   */
  addControl(name: keyof T, control: AbstractControl): void {
    this._registerControl(name, control)
    this.valueRef.value = this._calculateValue(this.controls)
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Remove a control from this form group.
   *
   * @param name The control name to remove from the collection
   */
  removeControl(name: keyof T): void {
    delete this.controls[name]
    this.valueRef.value = this._calculateValue(this.controls)
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Replace an existing control.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   */
  setControl(name: keyof T, control: AbstractControl): void {
    delete this.controls[name]
    this._registerControl(name, control)
    this.valueRef.value = this._calculateValue(this.controls)
    this._watchStatus()
    this._watchBlurred()
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
   */
  setValue(value: Partial<T>): void {
    Object.keys(value).forEach(key => {
      this.controls[key as keyof T]!.setValue((value as any)[key])
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
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidationErrors | null> {
    this._forEachChild(control => control.validate())
    return this._validate()
  }

  private _watchValid() {
    watch(
      [this.valueRef, this.blurred],
      () => {
        if (this.trigger === 'change' || (this.trigger === 'blur' && this.blurred.value)) {
          this._validate()
        }
      },
      { deep: true },
    )
  }

  private _watchStatus() {
    if (this._statusWatchStopHandle) {
      this._statusWatchStopHandle()
    }
    this._statusWatchStopHandle = watchEffect(() => {
      let status: ValidationStatus = this.errors.value ? 'invalid' : 'valid'
      if (status === 'valid') {
        for (const key in this.controls) {
          const controlStatus = this.controls[key]!.status.value
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
      for (const key in this.controls) {
        if (this.controls[key]!.blurred.value) {
          blurred = true
          break
        }
      }
      this._blurred.value = blurred
    })
  }

  private _calculateValue(controls: Partial<Record<keyof T, AbstractControl<T>>>) {
    const value = {} as Partial<Record<keyof T, Ref<UnwrapRef<T>>>>

    Object.keys(controls).forEach(key => {
      value[key as keyof T] = controls[key as keyof T]!.valueRef
    })

    return value
  }

  private _registerControl(name: keyof T, control: AbstractControl<T>) {
    if (hasOwnProperty(this.controls, name as string)) {
      return
    }
    this.controls[name] = control
    control.setParent(this as any)
  }

  private _forEachChild(cb: (v: AbstractControl, k: keyof T) => void): void {
    Object.keys(this.controls).forEach(key => cb(this.controls[key as keyof T]!, key as keyof T))
  }
}
