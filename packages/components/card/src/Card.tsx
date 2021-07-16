import type { ComputedRef, Slot, VNode, VNodeTypes } from 'vue'
import type { HeaderProps } from '@idux/components/header'
import type { CardConfig } from '@idux/components/config'
import type { CardButtonProps, CardCover, CardProps, CardSize } from './types'

import { computed, defineComponent, isVNode, provide, ref } from 'vue'
import { isString } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxHeader } from '@idux/components/header'
import { cardToken } from './token'
import { cardProps } from './types'

export default defineComponent({
  name: 'IxCard',
  props: cardProps,
  setup(props) {
    const config = useGlobalConfig('card')
    const hoverable = computed(() => props.hoverable ?? config.hoverable)
    const size$$ = computed(() => props.size ?? config.size)
    const { hasGrid } = useChildren(hoverable)
    const classes = useClasses(props, config, hoverable, size$$, hasGrid)

    return { classes, size$$ }
  },
  render() {
    const cover = renderCover(this.$slots.cover, this.cover)
    const header = renderHeader(this.$slots.header, this.header, this.size$$)
    const body = renderBody(this.$slots.default, this.loading)
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
  return computed(() => {
    const borderless = props.borderless ?? cardConfig.borderless
    const hasGridValue = hasGrid.value
    return {
      'ix-card': true,
      'ix-card-borderless': borderless,
      'ix-card-hoverable': !hasGridValue && hoverable.value,
      'ix-card-loading': props.loading,
      'ix-card-has-grid': hasGridValue,
      [`ix-card-${size.value}`]: true,
    }
  })
}

const useChildren = (hoverable: ComputedRef<boolean>) => {
  const gridCount = ref(0)
  const hasGrid = computed(() => gridCount.value > 0)

  const registerGrid = () => gridCount.value++
  const unregisterGrid = () => gridCount.value--

  provide(cardToken, { hoverable, registerGrid, unregisterGrid })

  return { hasGrid }
}

const renderCover = (coverSlot: Slot | undefined, cover: string | CardCover | undefined) => {
  let child: VNodeTypes | undefined
  if (coverSlot) {
    child = coverSlot()
  } else if (cover) {
    const imgProps = isString(cover) ? { src: cover } : cover
    child = <img {...imgProps} />
  }
  return child ? <div class="ix-card-cover">{child}</div> : null
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
  ['ix-col-span-22'],
  ['ix-col-span-8', 'ix-col-span-15'],
  ['ix-col-span-6', 'ix-col-span-18'],
  ['ix-col-span-13', 'ix-col-span-9'],
  ['ix-col-span-4', 'ix-col-span-3', 'ix-col-span-16'],
  ['ix-col-span-8', 'ix-col-span-6', 'ix-col-span-8'],
]

const renderBody = (defaultSlot: Slot | undefined, loading: boolean) => {
  let child: VNodeTypes | undefined
  if (loading) {
    const loadingChild = listOfLoading.map(items => {
      const cols = items.map(col => (
        <div class={`ix-col ${col} ix-card-loading-col`}>
          <div class="ix-card-loading-block"></div>
        </div>
      ))
      return <div class="ix-row">{cols}</div>
    })
    child = <div class="ix-card-loading">{loadingChild}</div>
  } else {
    child = defaultSlot?.()
  }
  return child ? <div class="ix-card-body">{child}</div> : null
}

const renderFooter = (footerSlot: Slot | undefined, footer: Array<CardButtonProps | VNode> | undefined) => {
  if (!footerSlot && !footer) {
    return null
  }

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

  return <ul class="ix-card-footer">{child}</ul>
}
