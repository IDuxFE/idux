import { computed, defineComponent } from 'vue'
import { timePickerTriggerProps } from '../types'
import { useGlobalConfig } from '@idux/components/config'

export default defineComponent({
  name: 'IxTimePickerTrigger',
  props: timePickerTriggerProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker-trigger`)

    return () => {
        return (
            <div class={`${mergedPrefixCls.value}`}>

            </div>
        )
    }
  }
})
