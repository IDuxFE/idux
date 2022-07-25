/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, createVNode, defineComponent } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { IxForm, IxFormItem } from '@idux/components/form'
import { useGlobalConfig } from '@idux/pro/config'

import { useAjvValidator } from './composables/useAjvValidator'
import { useForm } from './composables/useForm'
import { proFormProps } from './types'

export default defineComponent({
  name: 'IxProForm',
  props: proFormProps,
  setup(props, { expose, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('form')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-form`)
    const createValidator = useAjvValidator(props, config)
    const formContext = useForm(props, config, createValidator)

    const getFormGroup = () => formContext.formGroup

    expose({ getFormGroup })

    const onSubmit = (evt: Event) => {
      evt.stopPropagation()
      evt.preventDefault()
      const { formGroup } = formContext
      if (formGroup.valid.value) {
        callEmit(props.onSubmit, formGroup.getValue())
      } else {
        formGroup.markAsDirty()
        formGroup.markAsBlurred()
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getSlot = (custom: string | ((_?: any) => VNodeChild) | undefined) => {
      return isString(custom) ? slots[custom] : custom
    }

    return () => {
      const { formGroup, formProps, formItems } = formContext
      const items = formItems.map(item => {
        const { component, componentProps, formItemProps } = item
        const defaultSlot = getSlot(item.customControl)

        const itemSlots = {
          default: defaultSlot ? () => defaultSlot(componentProps) : () => createVNode(component!, componentProps),
          controlTooltip: getSlot(item.customControlTooltip),
          description: getSlot(item.customDescription),
          label: getSlot(item.customLabel),
          labelTooltip: getSlot(item.customLabelTooltip),
          message: getSlot(item.customMessage),
        }
        return <IxFormItem v-slots={itemSlots} {...formItemProps}></IxFormItem>
      })
      return (
        <IxForm class={mergedPrefixCls} control={formGroup} onSubmit={onSubmit} {...formProps}>
          {items}
          {slots.default?.({ formGroup })}
        </IxForm>
      )
    }
  },
})
