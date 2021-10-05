import type { ComputedRef, Slot, Slots, VNode, VNodeTypes } from 'vue'
import type { HeaderProps } from '@idux/components/header'
import type { CardConfig } from '@idux/components/config'
import type { CardButtonProps, CardCover, CardProps, CardSize } from './types'

import { computed, defineComponent, isVNode, provide } from 'vue'
import { isString } from 'lodash-es'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxRow } from '@idux/components/grid'
import { IxHeader } from '@idux/components/header'
import { cardToken } from './token'
import { cardProps } from './types'

export default defineComponent({
  name: 'IxCard',
  props: cardProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('card')
    const hoverable = computed(() => props.hoverable ?? config.hoverable)
    const size$$ = computed(() => props.size ?? config.size)
    const { hasGrid } = useChildren(slots, hoverable)
    const classes = useClasses(props, config, hoverable, size$$, hasGrid)

    return { classes, size$$, hasGrid }
  },
  render() {
    const cover = renderCover(this.$slots.cover, this.cover)
    const header = renderHeader(this.$slots.header, this.header, this.size$$)
    const body = renderBody(this.$slots.default, this.loading, this.hasGrid)
    const footer = renderFooter(this.$slots.footer, this.footer)

    return (
      <div class={this.classes}>
        {cover}
        {header}
        {body}
        {footer}
      </div>
    )
  },
})

const useClasses = (
  props: CardProps,
  cardConfig: CardConfig,
  hoverable: ComputedRef<boolean>,
  size: ComputedRef<CardSize>,
  hasGrid: ComputedRef<boolean>,
) => {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const borderless = props.borderless ?? cardConfig.borderless
    const hasGridValue = hasGrid.value
    return {
      [`${prefixCls}-card`]: true,
      [`${prefixCls}-card-borderless`]: borderless,
      [`${prefixCls}-card-hoverable`]: !hasGridValue && hoverable.value,
      [`${prefixCls}-card-loading`]: props.loading,
      [`${prefixCls}-card-has-grid`]: hasGridValue,
      [`${prefixCls}-card-${size.value}`]: true,
    }
  })
}

const useChildren = (slots: Slots, hoverable: ComputedRef<boolean>) => {
  const hasGrid = computed(() => {
    const children = slots.default?.() || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return children.some(node => node.type && (node.type as any).name === 'IxCardGrid')
  })

  provide(cardToken, { hoverable })

  return { hasGrid }
}

const renderCover = (coverSlot: Slot | undefined, cover: string | CardCover | undefined) => {
  const { prefixCls } = useGlobalConfig('common')
  let child: VNodeTypes | undefined

  if (coverSlot) {
    child = coverSlot()
  } else if (cover) {
    const imgProps = isString(cover) ? { src: cover } : cover
    child = <img {...imgProps} />
  }
  return child ? <div class={`${prefixCls}-card-cover`}>{child}</div> : null
}

const renderHeader = (headerSlot: Slot | undefined, header: string | HeaderProps | undefined, size: CardSize) => {
  if (headerSlot) {
    return headerSlot()
  }

  if (!header) {
    return null
  }

  const headerProps = isString(header) ? { title: header } : header
  return <IxHeader size={size} {...headerProps}></IxHeader>
}

const listOfLoading = [
  ['col-span-22'],
  ['col-span-8', 'col-span-15'],
  ['col-span-6', 'col-span-18'],
  ['col-span-13', 'col-span-9'],
  ['col-span-4', 'col-span-3', 'col-span-16'],
  ['col-span-8', 'col-span-6', 'col-span-8'],
]

const renderLoading = () => {
  const { prefixCls } = useGlobalConfig('common')
  const loadingChild = listOfLoading.map(items => {
    const cols = items.map(col => (
      <div class={`${prefixCls}-col ${prefixCls}-${col} ${prefixCls}-card-loading-col`}>
        <div class={`${prefixCls}-card-loading-block`}></div>
      </div>
    ))
    return <div class={`${prefixCls}-row`}>{cols}</div>
  })
  return <div class={`${prefixCls}-card-loading`}>{loadingChild}</div>
}

const renderBody = (defaultSlot: Slot | undefined, loading: boolean, hasGrid: boolean) => {
  const { prefixCls } = useGlobalConfig('common')
  let child: VNodeTypes | undefined

  if (loading) {
    child = renderLoading()
  } else if (defaultSlot) {
    child = hasGrid ? <IxRow>{defaultSlot()}</IxRow> : defaultSlot()
  }
  return child ? <div class={`${prefixCls}-card-body`}>{child}</div> : null
}

const renderFooter = (footerSlot: Slot | undefined, footer: Array<CardButtonProps | VNode> | undefined) => {
  if (!footerSlot && !footer) {
    return null
  }
  const { prefixCls } = useGlobalConfig('common')
  let child: VNodeTypes
  if (footerSlot) {
    child = footerSlot()
  } else {
    child = footer!.map(item => {
      let itemChild: VNodeTypes | null
      if (isVNode(item)) {
        itemChild = item
      } else {
        // The default value for `visible` is true
        const { text, visible = true, ...rest } = item
        itemChild = visible ? <IxButton {...rest}>{text}</IxButton> : null
      }
      return itemChild ? <li>{itemChild}</li> : null
    })
  }

  return <ul class={`${prefixCls}-card-footer`}>{child}</ul>
}
