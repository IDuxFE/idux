/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  AsyncValidatorFn,
  TriggerType,
  ValidateError,
  ValidateErrors,
  ValidateStatus,
  ValidatorFn,
  ValidatorOptions,
} from './types'
import type { ComputedRef, Ref, WatchCallback, WatchOptions, WatchStopHandle } from 'vue'

import { computed, ref, shallowRef, watch, watchEffect } from 'vue'

import { isArray, isNil, isPlainObject, isString } from 'lodash-es'

import { hasOwnProperty } from '@idux/cdk/utils'

import { Validators } from './validators'

type IsNullable<T, K> = undefined extends T ? K : never

type OptionalKeys<T> = { [K in keyof T]-?: IsNullable<T[K], K> }[keyof T]

function isOptions(val?: ValidatorFn | ValidatorFn[] | ValidatorOptions): val is ValidatorOptions {
  return isPlainObject(val)
}

function toValidator(validator?: ValidatorFn | ValidatorFn[]): ValidatorFn | undefined {
  return isArray(validator) ? Validators.compose(validator) : validator
}

function toAsyncValidator(asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): AsyncValidatorFn | undefined {
  return isArray(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator
}

export type ArrayElement<A> = A extends (infer T)[] ? T : never

export type GroupControls<T> = {
  [K in keyof T]: AbstractControl<T[K]>
}

export type ControlPathType = string | number | Array<string | number>

let controlId = 0
export abstract class AbstractControl<T = any> {
  readonly uid: number = controlId++
  /**
   * A collection of child controls.
   */
  readonly controls!: ComputedRef<any>

  /**
   * The ref value for the control.
   */
  readonly valueRef!: ComputedRef<T>

  /**
   * The validation status of the control, there are three possible validation status values:
   * * **valid**: This control has passed all validation checks.
   * * **invalid**: This control has failed at least one validation check.
   * * **validating**: This control is in the midst of conducting a validation check.
   */
  readonly status!: ComputedRef<ValidateStatus>

  /**
   * An object containing any errors generated by failing validation, or undefined if there are no errors.
   */
  readonly errors!: ComputedRef<ValidateErrors | undefined>

  /**
   * A control is valid when its `status` is `valid`.
   */
  readonly valid!: ComputedRef<boolean>

  /**
   * A control is invalid when its `status` is `invalid`.
   */
  readonly invalid!: ComputedRef<boolean>

  /**
   * A control is validating when its `status` is `validating`.
   */
  readonly validating!: ComputedRef<boolean>

  /**
   * A control is validating when its `status` is `disabled`.
   */
  readonly disabled!: ComputedRef<boolean>

  /**
   * A control is marked `blurred` once the user has triggered a `blur` event on it.
   */
  readonly blurred!: ComputedRef<boolean>

  /**
   * A control is `unblurred` if the user has not yet triggered a `blur` event on it.
   */
  readonly unblurred!: ComputedRef<boolean>

  /**
   * A control is `dirty` if the user has changed the value in the UI.
   */
  readonly dirty!: ComputedRef<boolean>

  /**
   * A control is `pristine` if the user has not yet changed the value in the UI.
   */
  readonly pristine!: ComputedRef<boolean>

  /**
   * The parent control.
   */
  get parent(): AbstractControl | undefined {
    return this._parent
  }

  /**
   * Retrieves the top-level ancestor of this control.
   */
  get root(): AbstractControl<T> {
    let root = this as AbstractControl<T>

    while (root.parent) {
      root = root.parent
    }

    return root
  }

  /**
   * Reports the trigger validate of the `AbstractControl`.
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */
  get trigger(): TriggerType {
    return this._trigger ?? this._parent?.trigger ?? 'change'
  }

  /**
   * Whether to remove the first and tail space
   * Possible value: true | false
   * Default value: false
   */
  get trim(): boolean {
    return this._trim ?? this._parent?.trim ?? false
  }

  name?: string

  protected _controls: Ref<any>
  protected _valueRef!: Ref<T>
  protected _status!: Ref<ValidateStatus>
  protected _controlsStatus!: Ref<ValidateStatus>
  protected _errors!: Ref<ValidateErrors | undefined>
  protected _disabled!: Ref<boolean>
  protected _blurred = ref(false)
  protected _dirty = ref(false)

  private _validators: ValidatorFn | undefined
  private _asyncValidators: AsyncValidatorFn | undefined
  private _parent: AbstractControl<T> | undefined
  private _trigger?: TriggerType
  private _trim?: boolean

  constructor(
    controls?: GroupControls<T> | AbstractControl<ArrayElement<T>>[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    initValue?: T,
  ) {
    this._controls = shallowRef(controls)
    this._valueRef = shallowRef(initValue ?? this._calculateInitValue())
    this._forEachControls(control => control.setParent(this))
    this._convertOptions(validatorOrOptions, asyncValidator)
    this._init()
  }

  /**
   * Sets a new value for the control.
   *
   * @param value The new value.
   * @param options Configuration options that emits events when the value changes.
   * * `dirty`: Marks it dirty, default is false.
   */
  abstract setValue(value: T | Partial<T>, options?: { dirty?: boolean }): void

  /**
   * The aggregate value of the control.
   */
  abstract getValue(): T

  protected abstract _forEachControls(cb: (v: AbstractControl, k: keyof T) => void): void

  protected abstract _calculateInitValue(): T

  /**
   * Resets the control, marking it `unblurred` `pristine`, and setting the value to initialization value.
   */
  reset(): void {
    if (this._controls.value) {
      this._forEachControls(control => control.reset())
    } else {
      this._valueRef.value = this._calculateInitValue()
      this.markAsUnblurred()
      this.markAsPristine()
    }
  }

  /**
   * Running validations manually, rather than automatically.
   */
  async validate(): Promise<ValidateErrors | undefined> {
    if (this._controls.value) {
      const validates: Promise<ValidateErrors | undefined>[] = []
      this._forEachControls(control => validates.push(control.validate()))
      if (validates.length > 0) {
        await Promise.all(validates)
      }
    }
    return this._validate()
  }

  /**
   * Marks the control as `disable`.
   */
  disable(): void {
    this._disabled.value = true
    this._errors.value = undefined

    if (this._controls.value) {
      this._forEachControls(control => control.disable())
    }
  }

  /**
   * Enables the control,
   */
  enable(): void {
    this._disabled.value = false
    this._validate()

    if (this._controls.value) {
      this._forEachControls(control => control.enable())
    }
  }

  /**
   * Marks the control as `blurred`.
   */
  markAsBlurred(): void {
    if (this._controls.value) {
      this._forEachControls(control => control.markAsBlurred())
    } else {
      this._blurred.value = true
    }
    if (this.trigger === 'blur') {
      this._validate()
    }
  }

  /**
   * Marks the control as `unblurred`.
   */
  markAsUnblurred(): void {
    if (this._controls.value) {
      this._forEachControls(control => control.markAsUnblurred())
    } else {
      this._blurred.value = false
    }
  }

  /**
   * Marks the control as `dirty`.
   */
  markAsDirty(): void {
    if (this._controls.value) {
      this._forEachControls(control => control.markAsDirty())
    } else {
      this._dirty.value = true
    }
  }

  /**
   * Marks the control as `pristine`.
   */
  markAsPristine(): void {
    if (this._controls.value) {
      this._forEachControls(control => control.markAsPristine())
    } else {
      this._dirty.value = false
    }
  }

  /**
   * Sets the new sync validator for the form control, it overwrites existing sync validators.
   * If you want to clear all sync validators, you can pass in a undefined.
   */
  setValidator(newValidator?: ValidatorFn | ValidatorFn[]): void {
    this._validators = toValidator(newValidator)
  }

  /**
   * Sets the new async validator for the form control, it overwrites existing async validators.
   * If you want to clear all async validators, you can pass in a undefined.
   */
  setAsyncValidator(newAsyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | undefined): void {
    this._asyncValidators = toAsyncValidator(newAsyncValidator)
  }

  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   */
  get<K extends OptionalKeys<T>>(path: K): AbstractControl<T[K]> | undefined
  get<K extends keyof T>(path: K): AbstractControl<T[K]>
  get<TK = any>(path: ControlPathType): AbstractControl<TK> | undefined
  get<TK = any>(path: ControlPathType): AbstractControl<TK> | undefined {
    if (isNil(path)) {
      return undefined
    }
    if (!isArray(path)) {
      path = path.toString().split('.')
    }
    if (path.length === 0) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let controlToFind: AbstractControl | undefined = this
    // Not using Array.reduce here due to a Chrome 80 bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    path.forEach((name: string | number) => {
      if (controlToFind instanceof FormGroup) {
        const controls = controlToFind.controls.value
        // eslint-disable-next-line no-prototype-builtins
        controlToFind = controls.hasOwnProperty(name) ? controls[name] : undefined
      } else if (controlToFind instanceof FormArray) {
        controlToFind = controlToFind.at(<number>name)
      } else {
        controlToFind = undefined
      }
    })
    return controlToFind
  }

  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   */
  setErrors(errors?: ValidateErrors): void {
    this._errors.value = errors
  }

  /**
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   */
  getError(errorCode: string, path?: ControlPathType): ValidateError | undefined {
    const control = path ? this.get(path) : (this as AbstractControl)
    return control?._errors?.value?.[errorCode]
  }

  /**
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   */
  hasError(errorCode: string, path?: ControlPathType): boolean {
    return !!this.getError(errorCode, path)
  }

  /**
   * @param parent Sets the parent of the control
   */
  setParent(parent: AbstractControl): void {
    this._parent = parent
  }

  /**
   * Watch the ref value for the control.
   *
   * @param cb The callback when the value changes
   * @param options Optional options of watch
   */
  watchValue(cb: WatchCallback<T, T | undefined>, options?: WatchOptions): WatchStopHandle {
    return watch(this.valueRef, cb, options)
  }

  /**
   * Watch the status for the control.
   *
   * @param cb The callback when the status changes
   * @param options Optional options of watch
   */
  watchStatus(cb: WatchCallback<ValidateStatus, ValidateStatus | undefined>, options?: WatchOptions): WatchStopHandle {
    return watch(this.status, cb, options)
  }

  protected async _validate(): Promise<ValidateErrors | undefined> {
    let newErrors = undefined
    if (!this._disabled.value) {
      let value = undefined
      if (this._validators) {
        value = this.getValue()
        newErrors = this._validators(value, this)
      }
      if (isNil(newErrors) && this._asyncValidators) {
        value = this._validators ? value : this.getValue()
        this._status.value = 'validating'
        newErrors = await this._asyncValidators(value, this)
      }
    }
    this.setErrors(newErrors)
    return newErrors
  }

  private _convertOptions(
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    let disabled = false
    if (isOptions(validatorOrOptions)) {
      this.name = validatorOrOptions.name
      this._trigger = validatorOrOptions.trigger ?? this._trigger
      this._trim = validatorOrOptions.trim ?? this._trim
      this._validators = toValidator(validatorOrOptions.validators)
      this._asyncValidators = toAsyncValidator(validatorOrOptions.asyncValidators)
      if (validatorOrOptions.disabled) {
        disabled = true
        const controls = this._controls.value
        if (controls) {
          for (const key in controls) {
            ;(controls as any)[key].disable()
          }
        }
      }
    } else {
      this._validators = toValidator(validatorOrOptions)
      this._asyncValidators = toAsyncValidator(asyncValidator)
    }
    this._disabled = ref(disabled)
  }

  private _init(): void {
    ;(this as any).controls = computed(() => this._controls.value)
    ;(this as any).valueRef = computed(() => this._valueRef.value)
    this._initErrorsAndStatus()
    ;(this as any).errors = computed(() => this._errors.value)
    ;(this as any).status = computed(() => {
      const selfStatus = this._status.value
      if (selfStatus === 'valid') {
        return this._controlsStatus.value
      }
      return selfStatus
    })
    ;(this as any).valid = computed(() => this.status.value === 'valid')
    ;(this as any).invalid = computed(() => this.status.value === 'invalid')
    ;(this as any).validating = computed(() => this.status.value === 'validating')
    ;(this as any).disabled = computed(() => this._disabled.value)
    ;(this as any).blurred = computed(() => this._blurred.value)
    ;(this as any).unblurred = computed(() => !this._blurred.value)
    ;(this as any).dirty = computed(() => this._dirty.value)
    ;(this as any).pristine = computed(() => !this._dirty.value)
  }

  private _initErrorsAndStatus() {
    const disabled = this._disabled.value
    let value: T | undefined
    let errors: ValidateErrors | undefined
    let status: ValidateStatus = 'valid'
    let controlsStatus: ValidateStatus = 'valid'

    if (!disabled) {
      if (this._validators) {
        value = this.getValue()
        errors = this._validators(value, this)
      }

      if (errors) {
        status = 'invalid'
      }

      const controls = this._controls.value
      if (controls) {
        for (const key in controls) {
          const controlStatus = (controls as any)[key].status.value
          if (controlStatus === 'invalid') {
            controlsStatus = 'invalid'
            break
          }
        }
      }
    }

    this._errors = shallowRef(errors)
    this._status = ref(status)
    this._controlsStatus = ref(controlsStatus)

    if (!disabled && status === 'valid' && controlsStatus === 'valid' && this._asyncValidators) {
      value = this._validators ? value : this.getValue()
      this._status.value = 'validating'
      this._asyncValidators(value, this).then(asyncErrors => {
        this._errors.value = asyncErrors
        this._status.value = asyncErrors ? 'invalid' : 'valid'
      })
    }
  }
}

export class FormControl<T = any> extends AbstractControl<T> {
  readonly controls!: ComputedRef<undefined>
  constructor(
    private _initValue?: T,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(undefined, validatorOrOptions, asyncValidator, _initValue)

    this._watchValid()
    this._watchStatus()
  }

  setValue(value: T, options: { dirty?: boolean } = {}): void {
    this._valueRef.value = value
    if (options.dirty) {
      this.markAsDirty()
    }
  }

  getValue(): T {
    const value = this._valueRef.value
    return this.trim && isString(value) ? (value as any).trim() : value;
  }

  protected _forEachControls(_: (v: AbstractControl, k: never) => void): void {}

  protected _calculateInitValue(): T {
    return this._initValue as T
  }

  private _watchValid() {
    watch(this._valueRef, () => {
      if (this.trigger === 'change') {
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

export class FormGroup<T extends Record<string, any> = Record<string, any>> extends AbstractControl<T> {
  readonly controls!: ComputedRef<GroupControls<T>>
  protected _controls!: Ref<GroupControls<T>>

  constructor(
    /**
     * A collection of child controls. The key for each child is the name under which it is registered.
     */
    controls: GroupControls<T>,
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(controls, validatorOrOptions, asyncValidator)

    this._watchValid()
    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  setValue(value: Partial<T>, options: { dirty?: boolean } = {}): void {
    Object.keys(value).forEach(key => {
      this._controls.value[key].setValue((value as any)[key], options)
    })
  }

  getValue(): T {
    const value = {} as T
    this._forEachControls((control, key) => {
      value[key] = control.getValue()
    })
    return value
  }

  protected _calculateInitValue(): T {
    return this.getValue()
  }

  protected _forEachControls(cb: (v: AbstractControl, k: keyof T) => void): void {
    const controls = this._controls.value
    Object.keys(controls).forEach(key => cb(controls[key], key))
  }

  /**
   * Add a control to this form group.
   *
   * @param name The control name to add to the collection
   * @param control Provides the control for the given name
   */
  addControl<K extends OptionalKeys<T>>(name: K, control: AbstractControl<T[K]>): void {
    const controls = { ...this._controls.value }
    if (hasOwnProperty(controls, name as string)) {
      return
    }
    control.setParent(this)
    controls[name] = control
    this._controls.value = controls
  }

  /**
   * Remove a control from this form group.
   *
   * @param name The control name to remove from the collection
   */
  removeControl<K extends OptionalKeys<T>>(name: K): void {
    const controls = { ...this._controls.value }
    delete controls[name]
    this._controls.value = controls
  }

  /**
   * Replace an existing control.
   *
   * @param name The control name to replace in the collection
   * @param control Provides the control for the given name
   */
  setControl<K extends keyof T>(name: K, control: AbstractControl<T[K]>): void {
    control.setParent(this)
    const controls = { ...this._controls.value }
    controls[name] = control
    this._controls.value = controls
  }

  private _watchValid() {
    watch(this._valueRef, () => {
      if (this.trigger === 'change') {
        this._validate()
      }
    })
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
        if (controls[key].dirty.value) {
          dirty = true
          break
        }
      }
      this._dirty.value = dirty
    })
  }
}

export class FormArray<T extends any[] = any[]> extends AbstractControl<T> {
  readonly controls!: ComputedRef<AbstractControl<ArrayElement<T>>[]>
  protected _controls!: Ref<AbstractControl<ArrayElement<T>>[]>

  /**
   * Length of the control array.
   */
  readonly length: ComputedRef<number>

  constructor(
    /**
     * An array of child controls. Each child control is given an index where it is registered.
     */
    controls: AbstractControl<ArrayElement<T>>[],
    validatorOrOptions?: ValidatorFn | ValidatorFn[] | ValidatorOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(controls, validatorOrOptions, asyncValidator)

    this.length = computed(() => this._controls.value.length)

    this._watchValid()
    this._watchValue()
    this._watchStatus()
    this._watchBlurred()
    this._watchDirty()
  }

  setValue(value: Partial<ArrayElement<T>>[], options: { dirty?: boolean } = {}): void {
    value.forEach((item, index) => {
      if (this.at(index)) {
        this.at(index).setValue(item, options)
      }
    })
  }

  getValue(): T {
    return this._controls.value.map(control => control.getValue()) as T
  }

  protected _calculateInitValue(): T {
    return this.getValue()
  }

  protected _forEachControls(cb: (v: AbstractControl, k: keyof T) => void): void {
    this._controls.value.forEach(cb)
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
    this._controls.value = [...this._controls.value, control]
  }

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: AbstractControl<ArrayElement<T>>): void {
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
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: AbstractControl<ArrayElement<T>>): void {
    control.setParent(this as AbstractControl)
    const controls = [...this._controls.value]
    controls.splice(index, 1, control)
    this._controls.value = controls
  }

  private _watchValid() {
    watch(this._valueRef, () => {
      if (this.trigger === 'change') {
        this._validate()
      }
    })
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
