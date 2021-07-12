import type { Slot, VNode, VNodeTypes } from 'vue'
import type { HeaderProps } from './types'

import { computed, defineComponent, h, isVNode } from 'vue'
import { callEmit } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { headerProps } from './types'

export default defineComponent({
  name: 'IxHeader',
  props: headerProps,
  setup(props) {
    const classes = useClasses(props)

    const onPrefixClick = (evt: MouseEvent) => callEmit(props.onPrefixClick, evt)
    const onExtraClick = (evt: MouseEvent) => callEmit(props.onExtraClick, evt)

    return { classes, onPrefixClick, onExtraClick }
  },

  render() {
    const bar = this.showBar ? <span class="ix-header-bar"></span> : null
    const prefix = renderPrefix(this.$slots.prefix, this.prefix, this.onPrefixClick)
    const title = renderChild(this.$slots.default, this.title, 'ix-header-title')
    const subTitle = renderChild(this.$slots.subTitle, this.subTitle, 'ix-header-sub-title')
    const extra = renderExtra(this.$slots.extra, this.extra, this.onExtraClick)
    const description = renderChild(this.$slots.description, this.description, 'ix-header-description')
    return (
      <div class={this.classes}>
        <div class="ix-header-main">
          {bar}
          {prefix}
          {title}
          {subTitle}
        </div>
        {extra}
        {description}
      </div>
    )
  },
})

const useClasses = (props: HeaderProps) => {
  return computed(() => {
    return {
      'ix-header': true,
      [`ix-header-${props.size}`]: true,
    }
  })
}

const renderPrefix = (
  prefixSlot: Slot | undefined,
  prefix: string | undefined,
  onPrefixClick: (evt: MouseEvent) => void,
) => {
  if (!prefixSlot && !prefix) {
    return null
  }
  const child = prefixSlot ? prefixSlot() : <IxIcon name={prefix} onClick={onPrefixClick} />
  return <span class="ix-header-prefix">{child}</span>
}

const renderChild = (titleSlot: Slot | undefined, title: string | undefined, className: string) => {
  if (!titleSlot && !title) {
    return null
  }
  const child = titleSlot ? titleSlot() : title
  return <span class={className}>{child}</span>
}

const renderExtra = (
  extraSlot: Slot | undefined,
  extra: string | VNode | undefined,
  onExtraClick: (evt: MouseEvent) => void,
) => {
  if (!extraSlot && !extra) {
    return null
  }

  let child: VNodeTypes

  if (extraSlot) {
    child = extraSlot()
  } else if (isVNode(extra)) {
    child = h(extra, { onClick: onExtraClick })
  } else {
    child = <IxIcon name={extra} onClick={onExtraClick} />
  }

  return <div class="ix-header-extra">{child}</div>
}
