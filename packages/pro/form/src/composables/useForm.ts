/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Component, computed } from 'vue'

import { isString } from 'lodash-es'

import {
  type AbstractControl,
  type FormGroup,
  ValidatorFn,
  Validators,
  useFormArray,
  useFormControl,
  useFormGroup,
} from '@idux/cdk/forms'
import { convertArray } from '@idux/cdk/utils'
import { type FormItemProps, type FormProps } from '@idux/components/form'
import { type RowProps } from '@idux/components/grid'
import { type ProFormConfig } from '@idux/pro/config'

import {
  type ObjectKeywords,
  type ProFormFieldsSchema,
  type ProFormItemCustoms,
  type ProFormJsonSchema,
  type ProFormProps,
  type StringKeywords,
} from '../types'
import { type SchemaValidatorCreator } from './useAjvValidator'

export interface FormContext {
  formGroup: FormGroup
  formProps?: FormProps
  formItems: FormItem[]
}

export interface FormItem extends ProFormItemCustoms {
  type?: 'object' | 'array'
  formItemProps?: FormItemProps & RowProps
  component?: string | Component
  componentProps?: any
}

export function useForm(
  props: ProFormProps,
  config: ProFormConfig,
  createValidator: SchemaValidatorCreator,
): FormContext {
  const mergedAutoId = computed(() => props.autoId ?? config.autoId)
  const mergedAutoLabelFor = computed(() => props.autoLabelFor ?? config.autoLabelFor)
  const mergedSchemaFormatter = computed(() => props.schemaFormatter ?? config.schemaFormatter)

  function useGroupConfigAndFormItems(fieldsSchema: ProFormFieldsSchema, jsonSchema: ProFormJsonSchema) {
    const groupConfig: Record<string, AbstractControl> = {}
    const formItems: FormItem[] = []

    const { properties: fieldsProperties = {} } = fieldsSchema
    const { properties: schemaProperties = {} } = jsonSchema as ObjectKeywords<unknown>

    // TODO: order
    const propKeys = new Set([...Object.keys(schemaProperties), ...Object.keys(fieldsProperties)])

    propKeys.forEach(key => {
      const { fields, schema } = mergedSchemaFormatter.value(fieldsProperties[key], (schemaProperties as any)[key])
      const { control, items } = useControlAndItems(fields, schema, fieldsSchema, jsonSchema, key)
      groupConfig[key] = control
      formItems.push(...items)
    })

    return { groupConfig, formItems }
  }

  function useControlAndItems(
    fieldsSchema: ProFormFieldsSchema,
    jsonSchema: ProFormJsonSchema,
    parentFields: ProFormFieldsSchema,
    parentSchema: ProFormJsonSchema,
    currKey: string | number,
  ) {
    const type = fieldsSchema.type || jsonSchema.type
    if (type === 'object' && (fieldsSchema.properties || (jsonSchema as any).properties)) {
      const context = useGroupConfigAndFormItems(fieldsSchema, jsonSchema)
      const { disabled, name, example, trigger, validators, asyncValidators } = fieldsSchema
      const control = useFormGroup(context.groupConfig, {
        disabled,
        name,
        example,
        trigger,
        validators,
        asyncValidators,
      })
      return { control, items: context.formItems }
    } else if (type === 'array' && (fieldsSchema.items || (jsonSchema as any).items)) {
      const childrenControls: AbstractControl[] = []
      const items: FormItem[] = []
      const initArr = fieldsSchema.default ?? parentFields.default?.[currKey] ?? (jsonSchema.default || [undefined])
      initArr.forEach((_: any, index: number) => {
        const { fields, schema } = mergedSchemaFormatter.value(fieldsSchema.items, (jsonSchema as any).items)
        const context = useControlAndItems(fields, schema, fieldsSchema, jsonSchema, index)
        childrenControls.push(context.control)
        items.push(...context.items)
      })
      const { disabled, name, example, trigger, validators, asyncValidators } = fieldsSchema
      const control = useFormArray(childrenControls, { disabled, name, example, trigger, validators, asyncValidators })
      return { control, items }
    } else {
      const initValue = fieldsSchema.default ?? parentFields.default?.[currKey] ?? jsonSchema.default
      const { disabled, name, example, trigger, validators, asyncValidators } = fieldsSchema

      const required = (parentSchema as ObjectKeywords<any>).required?.includes(currKey as string)

      const mergedValidators = [
        required ? Validators.required : undefined,
        ...convertArray(validators),
        createValidator(jsonSchema),
      ] as ValidatorFn[]

      const control = useFormControl(initValue, {
        disabled,
        name,
        example,
        trigger,
        asyncValidators,
        validators: mergedValidators,
      })

      const {
        formItemProps,
        component,
        componentProps,
        customControl,
        customControlTooltip,
        customDescription,
        customLabel,
        customLabelTooltip,
        customMessage,
      } = fieldsSchema
      const { title: label, description, format } = jsonSchema as StringKeywords<unknown>
      const defaultComponentConfig = config.formatComponents[format!] || config.formatComponents.default!
      const autoId = mergedAutoId.value
      const id = isString(autoId) ? autoId + currKey : autoId ? currKey : undefined
      const labelFor = mergedAutoLabelFor.value ? id : undefined
      return {
        control,
        items: [
          {
            formItemProps: { label, labelFor, description, control, required, ...formItemProps },
            component: component || defaultComponentConfig.component,
            componentProps: component
              ? { id, control, ...componentProps }
              : { ...defaultComponentConfig.componentProps, id, control, ...componentProps },
            customControl,
            customControlTooltip,
            customDescription,
            customLabel,
            customLabelTooltip,
            customMessage,
          },
        ],
      }
    }
  }

  const { fields, schema } = mergedSchemaFormatter.value(props.fields, props.schema)
  const { groupConfig, formItems } = useGroupConfigAndFormItems(fields, schema)

  const { formProps, disabled, name, example, trigger, asyncValidators, validators } = fields
  const formGroup = useFormGroup(groupConfig, { disabled, name, example, trigger, asyncValidators, validators })

  return { formGroup, formProps, formItems }
}
