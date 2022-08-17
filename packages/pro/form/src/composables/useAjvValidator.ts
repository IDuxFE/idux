/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed } from 'vue'

import { cloneDeep, isArray, isString, merge } from 'lodash-es'

import Ajv, { ErrorObject } from 'ajv'
import addFormats from 'ajv-formats'

import {
  type AbstractControl,
  type ValidateError,
  type ValidateErrors,
  type ValidatorFn,
  Validators,
} from '@idux/cdk/forms'
import { Logger } from '@idux/cdk/utils'
import { type ProFormConfig } from '@idux/pro/config'

import {
  type ArrayKeywords,
  type NumberKeywords,
  type ProFormJsonSchema,
  type ProFormProps,
  type StringKeywords,
} from '../types'

export type SchemaValidatorCreator = (schema: ProFormJsonSchema) => ValidatorFn

export function useAjvValidator(props: ProFormProps, config: ProFormConfig): SchemaValidatorCreator {
  // 非响应式，如果后面有动态设置 ajvOptions 的情况，再做优化
  const ajvOptions = merge(cloneDeep(config.ajvOptions), props.ajvOptions)
  const ajv = new Ajv(ajvOptions)
  addFormats(ajv)

  const mergedIgnoreKeywords = computed(() => props.ignoreKeywords ?? config.ignoreKeywords)

  const createValidator = (schema: ProFormJsonSchema): ValidatorFn => {
    return (value: unknown, control: AbstractControl): ValidateErrors | undefined => {
      if (value == null || ((isString(value) || isArray(value)) && value.length === 0)) {
        return undefined
      }
      try {
        ajv.validate(schema, value)
      } catch (e) {
        __DEV__ && Logger.warn('pro/forms', e)
      }
      let errors = ajv.errors || []
      const ignoreKeywords = mergedIgnoreKeywords.value
      if (ignoreKeywords.length) {
        errors = errors.filter(err => !ignoreKeywords.includes(err.keyword))
      }

      if (errors.length) {
        const error =
          getError(errors, schema, value) || Validators.getError('schema', control, { actual: value, errors, schema })
        return { schema: error }
      }
      return undefined
    }
  }

  return createValidator
}

function getError(errors: ErrorObject[], schema: ProFormJsonSchema, value: unknown) {
  let error: ValidateError | undefined
  const [firstError] = errors
  switch (firstError.keyword) {
    case 'format': {
      const { format } = schema as StringKeywords<unknown>
      const message = Validators.getMessage(format!)
      if (message) {
        error = { actual: value, errors, schema, message }
      }
      break
    }
    case 'pattern': {
      const { pattern } = schema as StringKeywords<unknown>
      const message = Validators.getMessage('pattern')
      if (message) {
        error = { actual: value, pattern, errors, schema, message }
      }
      break
    }
    case 'minLength':
    case 'maxLength': {
      const { minLength, maxLength } = schema as StringKeywords<unknown>
      const actual = (value as string).length
      const isArray = false
      const messageKey = minLength != null && maxLength != null ? 'rangeLength' : firstError.keyword
      const message = Validators.getMessage(messageKey)
      error = { actual, minLength, maxLength, isArray, errors, schema, message }
      break
    }
    case 'minimum':
    case 'maximum': {
      const { minimum: min, maximum: max } = schema as NumberKeywords<unknown>
      const actual = value
      const messageKey = min != null && max != null ? 'range' : firstError.keyword
      const message = Validators.getMessage(messageKey)
      error = { actual, min, max, errors, schema, message }
      break
    }
    case 'minItems':
    case 'maxItems': {
      const { minItems: minLength, maxItems: maxLength } = schema as ArrayKeywords<unknown>
      const actual = (value as string).length
      const isArray = true
      const messageKey = minLength != null && maxLength != null ? 'rangeLength' : firstError.keyword
      const message = Validators.getMessage(messageKey)
      error = { actual, minLength, maxLength, isArray, errors, schema, message }
      break
    }
  }
  return error
}
