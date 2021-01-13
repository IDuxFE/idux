/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Ref, UnwrapRef, WatchStopHandle } from 'vue'
import type { AsyncValidatorFn, ValidatorFn, ValidatorOptions, ValidationErrors, ValidationStatus } from '../types'

import { ref, watch, watchEffect } from 'vue'
import { AbstractControl } from './abstractControl'

export class FormArray<T = any[]> extends AbstractControl<T> {
  /**
   * The ref value for the form array.
   */
  readonly modelRef: Ref<Array<UnwrapRef<T>>>

  /**
   * Length of the control array.
   */
  get length(): number {
    return this.controls.length
  }

  private _statusWatchStopHandle: WatchStopHandle | null = null
  private _blurredWatchStopHandle: WatchStopHandle | null = null

  constructor(
    public controls: AbstractControl[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(validatorOrOptions, asyncValidator)
    controls.forEach(control => control.setParent(this as any))
    this.modelRef = ref(this._calculateModelRef(controls))

    this._watchValid()
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */
  at(index: number): AbstractControl {
    return this.controls[index]
  }

  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: AbstractControl): void {
    this.controls.push(control)
    this._registerControl(control)
    this.modelRef.value = this._calculateModelRef(this.controls)
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl): void {
    this.controls.splice(index, 0, control)
    this._registerControl(control)
    this.modelRef.value = this._calculateModelRef(this.controls)
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control
   */
  removeAt(index: number): void {
    this.controls.splice(index, 1)
    this.modelRef.value = this._calculateModelRef(this.controls)
    this._watchStatus()
    this._watchBlurred()
  }

  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: AbstractControl): void {
    this.controls.splice(index, 1, control)
    this._registerControl(control)
    this.modelRef.value = this._calculateModelRef(this.controls)
    this._watchStatus()
    this._watchBlurred()
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
   */
  setValue(value: Partial<T>[]): void {
    value.forEach((item, index) => {
      if (this.at(index)) {
        this.at(index).setValue(item)
      }
    })
  }

  /**
   * The aggregate value of the form array.
   */
  getValue(): T[] {
    return this.controls.map(control => control.getValue()) as T[]
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
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidationErrors | null> {
    this.controls.forEach(control => control.validate())
    return this._validate()
  }

  private _watchValid() {
    watch(
      [this.modelRef, this.blurred],
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

  private _calculateModelRef(controls: AbstractControl<T>[]) {
    return controls.map(control => control.modelRef)
  }

  private _registerControl(control: AbstractControl<T>) {
    control.setParent(this as any)
  }
}
