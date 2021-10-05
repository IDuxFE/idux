import { computed, defineComponent, inject } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { menuSubToken } from '../token'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')
    const { props, slots, config, isExpanded, changeExpanded, handleMouseEvent, mode, paddingLeft } =
      inject(menuSubToken)!

    const suffix = computed(() => props.suffix ?? config.suffix)

    const events = computed(() => {
      if (props.disabled) {
        return undefined
      }
      if (mode.value === 'inline') {
        return {
          onClick: () => changeExpanded(!isExpanded.value),
        }
      } else {
        return {
          onMouseenter: () => handleMouseEvent(true),
          onMouseleave: () => handleMouseEvent(false),
        }
      }
    })

    const rotate = computed(() => {
      if (mode.value === 'inline') {
        const suffixRotates = props.suffixRotates ?? config.suffixRotates
        return suffixRotates[isExpanded.value ? 0 : 1]
      }
      return 0
    })

    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    return () => {
      const { icon, label } = props

      const iconNode = slots.icon?.() ?? icon ? <IxIcon name={icon}></IxIcon> : undefined
      const iconWrapper = iconNode ? <span class={`${prefixCls}-menu-sub-title-icon`}>{iconNode}</span> : undefined

      const labelNode = <span> {slots.label?.() ?? label}</span>

      const suffixNode =
        slots.suffix?.({ rotate: rotate.value }) ?? suffix.value ? (
          <IxIcon name={suffix.value} rotate={rotate.value}></IxIcon>
        ) : undefined
      const suffixWrapper = suffixNode ? (
        <span class={`${prefixCls}-menu-sub-title-suffix-icon`}>{suffixNode}</span>
      ) : undefined

      return (
        <div class={`${prefixCls}-menu-sub-title`} style={style.value} {...events.value}>
          {iconWrapper}
          {labelNode}
          {suffixWrapper}
        </div>
      )
    }
  },
})
