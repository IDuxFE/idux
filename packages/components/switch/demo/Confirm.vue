<template>
  <IxPopconfirm v-model:visible="visible" :title="tempChecked ? '确定开启？' : '确定禁用？'" @ok="onOk">
    <span>
      <IxSwitch
        :checked="accessor.value"
        :disabled="accessor.disabled"
        @blur="onBlur"
        @change="onChange"
        @click="onClick"
      />
    </span>
  </IxPopconfirm>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'

import { AbstractControl, useAccessorAndControl } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

const props = defineProps({
  checked: {
    type: Boolean,
    default: undefined,
  },
  control: {
    type: [String, Number, Object] as PropType<string | number | AbstractControl>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<'all' | 'checked' | 'unchecked' | 'none'>,
    default: 'all',
  },
})

const { accessor, control: controlRef } = useAccessorAndControl({ valueKey: 'checked' })
useFormItemRegister(controlRef)

const visible = ref(false)
const tempChecked = ref(false)

const onOk = () => {
  accessor.setValue(tempChecked.value)
}

const onChange = (currValue: boolean) => {
  const { mode } = props
  if ((mode === 'checked' && currValue) || (mode === 'unchecked' && !currValue)) {
    visible.value = true
  }
  if (mode === 'none' || (mode === 'checked' && !currValue) || (mode === 'unchecked' && currValue)) {
    accessor.setValue(currValue)
  } else {
    tempChecked.value = currValue
  }
}

const onClick = (evt: MouseEvent) => {
  if (props.mode !== 'all') {
    evt.stopPropagation()
  }
}

const onBlur = () => {
  accessor.markAsBlurred()
}
</script>
