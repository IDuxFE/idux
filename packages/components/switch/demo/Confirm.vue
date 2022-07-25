<template>
  <IxPopconfirm v-model:visible="visible" :title="tempChecked ? '确定开启？' : '确定禁用？'" @ok="onOk">
    <span>
      <IxSwitch :checked="accessor.value" :disabled="accessor.disabled" @blur="onBlur" @change="onChange" />
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
// 这里为了演示效果，需要手动设置一个初始值
// 如果是二次封装组件，务必删除下面这行代码
accessor.setValue(true)

const visible = ref(false)
const tempChecked = ref(false)

const onOk = () => {
  accessor.setValue(tempChecked.value)
}

const onChange = (currValue: boolean) => {
  const { mode } = props
  const showPopconfirm = mode === 'all' || (mode === 'checked' && currValue) || (mode === 'unchecked' && !currValue)
  if (!showPopconfirm) {
    accessor.setValue(currValue)
  } else {
    tempChecked.value = currValue
  }
  visible.value = showPopconfirm
}

const onBlur = () => {
  accessor.markAsBlurred()
}
</script>
