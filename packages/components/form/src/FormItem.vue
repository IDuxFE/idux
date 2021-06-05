<template>
  <ix-row :class="itemClasses">
    <ix-col
      v-if="label || $slots.label || labelTooltip || $slots.labelTooltip"
      v-bind="labelColConfig"
      :class="labelClasses"
    >
      <label :for="labelFor">
        <slot name="label">{{ label }}</slot>
        <span v-if="labelTooltip || $slots.labelTooltip" class="ix-form-item-label-tooltip">
          <slot name="tooltip">
            <ix-tooltip :title="labelTooltip">
              <ix-icon name="question-circle" />
            </ix-tooltip>
          </slot>
        </span>
      </label>
    </ix-col>
    <ix-col v-bind="controlColConfig" class="ix-form-item-control">
      <div class="ix-form-item-control-input">
        <div class="ix-form-item-control-input-content">
          <slot></slot>
        </div>
        <span v-if="hasFeedback$$ && statusIcon" class="ix-form-item-status-icon">
          <ix-icon :name="statusIcon" />
        </span>
      </div>

      <div v-if="message$$" class="ix-form-item-message">
        {{ message$$ }}
      </div>
      <div v-if="extra || $slots.extra" class="ix-form-item-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </ix-col>
  </ix-row>
</template>

<script lang="ts">
import type { FormItemProps } from './types'

import { computed, defineComponent, inject } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxTooltip } from '@idux/components/tooltip'
import { formItemPropsDef } from './types'
import { useFormItemClasses, useFormItemColConfig, useFormItemControl, useFormItemLabelClasses } from './useFormItem'
import { formToken } from './token'

export default defineComponent({
  name: 'IxFormItem',
  components: { IxCol, IxRow, IxTooltip, IxIcon },
  props: formItemPropsDef,
  setup(props: FormItemProps) {
    const formContext = inject(formToken)
    const { control: control$$, errors, status, message: message$$, statusIcon } = useFormItemControl(props)
    const hasFeedback$$ = computed(() => props.hasFeedback ?? !!formContext?.hasFeedback.value)
    const itemClasses = useFormItemClasses(hasFeedback$$, status, message$$)
    const labelClasses = useFormItemLabelClasses(props, formContext)
    const { labelColConfig, controlColConfig } = useFormItemColConfig(props, formContext)

    return {
      hasFeedback$$,
      itemClasses,
      labelClasses,
      labelColConfig,
      controlColConfig,
      control$$,
      errors,
      message$$,
      statusIcon,
    }
  },
})
</script>
