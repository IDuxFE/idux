<template>
  <IxRow :class="itemClasses">
    <IxCol
      v-if="label || $slots.label || labelTooltip || $slots.labelTooltip"
      v-bind="labelColConfig"
      :class="labelClasses"
    >
      <label :for="labelFor">
        <slot name="label">{{ label }}</slot>
        <span v-if="labelTooltip || $slots.labelTooltip" class="ix-form-item-label-tooltip">
          <slot name="tooltip">
            <IxTooltip :title="labelTooltip">
              <IxIcon name="question-circle" />
            </IxTooltip>
          </slot>
        </span>
      </label>
    </IxCol>
    <IxCol v-bind="controlColConfig" class="ix-form-item-control">
      <div class="ix-form-item-control-input">
        <div class="ix-form-item-control-input-content">
          <slot></slot>
        </div>
        <span v-if="hasFeedback$$ && statusIcon" class="ix-form-item-status-icon">
          <IxIcon :name="statusIcon" />
        </span>
      </div>

      <div v-if="message$$" class="ix-form-item-message">
        {{ message$$ }}
      </div>
      <div v-if="extra || $slots.extra" class="ix-form-item-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </IxCol>
  </IxRow>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxTooltip } from '@idux/components/tooltip'
import { formItemProps } from './types'
import { useFormItemClasses, useFormItemColConfig, useFormItemControl, useFormItemLabelClasses } from './useFormItem'
import { formToken } from './token'

export default defineComponent({
  name: 'IxFormItem',
  components: { IxCol, IxRow, IxTooltip, IxIcon },
  props: formItemProps,
  setup(props) {
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
