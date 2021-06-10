import type { TitleProps } from './types'

import { computed, createTextVNode, defineComponent, Slot } from 'vue'
import { callEmit, toArray } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'
import { titleProps } from './types'

export default defineComponent({
  name: 'IxTitle',
  props: titleProps,
  setup(props) {
    const classes = useClasses(props)

    const extras = computed(() => toArray(props.extra))

    const onPrefixClick = (evt: MouseEvent) => callEmit(props.onPrefixClick, evt)
    const onExtraClick = (evt: MouseEvent, name: string) => callEmit(props.onExtraClick, evt, name)

    return { classes, extras, onPrefixClick, onExtraClick }
  },

  render() {
    const prefix = renderPrefix(this.$slots.prefix, this.prefix, this.onPrefixClick)
    const content = renderTitle(this.$slots.default, this.title, 'ix-title-content')
    const subTitle = renderTitle(this.$slots.subTitle, this.subTitle, 'ix-title-sub')
    const extra = renderExtra(this.$slots.extra, this.extras, this.onExtraClick)
    return (
      <div class={this.classes}>
        <div class="ix-title-main">
          {prefix}
          {content}
          {subTitle}
        </div>
        {extra}
      </div>
    )
  },
})

const useClasses = (props: TitleProps) => {
  return computed(() => {
    return {
      'ix-title': true,
      [`ix-title-${props.size}`]: true,
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
  return <span class="ix-title-prefix">{child}</span>
}

const renderTitle = (titleSlot: Slot | undefined, title: string | undefined, className: string) => {
  if (!titleSlot && !title) {
    return null
  }
  const child = titleSlot ? titleSlot() : createTextVNode(title)
  return <span class={className}>{child}</span>
}

const renderExtra = (
  extraSlot: Slot | undefined,
  extras: string[],
  onExtraClick: (evt: MouseEvent, name: string) => void,
) => {
  if (!extraSlot && extras.length === 0) {
    return null
  }
  const child = extraSlot
    ? extraSlot()
    : extras.map((icon, index) => <IxIcon key={icon + index} name={icon} onClick={evt => onExtraClick(evt, icon)} />)
  return <div class="ix-title-extra">{child}</div>
}
