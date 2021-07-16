import { onBeforeUnmount, onMounted, ref, Slot, VNode, VNodeTypes, watch } from 'vue'
import type { AvatarProps } from '@idux/components/avatar'
import type { HeaderProps } from './types'

import { computed, defineComponent, h, isVNode } from 'vue'
import { callEmit, getOffset, isString, offResize, onResize, toCssPixel } from '@idux/cdk/utils'
import { IxAvatar } from '@idux/components/avatar'
import { IxIcon } from '@idux/components/icon'
import { headerProps } from './types'

const avatarSizeTransformMap = {
  extraLarge: 'medium',
  large: 'medium',
  medium: 'small',
  small: 'small',
} as const

export default defineComponent({
  name: 'IxHeader',
  props: headerProps,
  setup(props) {
    const classes = useClasses(props)
    const avatarSize = computed(() => avatarSizeTransformMap[props.size])
    const { mainRef, titleRef, paddingLeft } = useDescriptionPaddingLeft()

    const onPrefixClick = (evt: MouseEvent) => callEmit(props.onPrefixClick, evt)
    const onExtraClick = (evt: MouseEvent) => callEmit(props.onExtraClick, evt)

    return { classes, avatarSize, mainRef, titleRef, paddingLeft, onPrefixClick, onExtraClick }
  },

  render() {
    const bar = this.showBar ? <span class="ix-header-bar"></span> : null
    const prefix = renderIcon(this.$slots.prefix, this.prefix, this.onPrefixClick, 'ix-header-prefix')
    const extra = renderIcon(this.$slots.extra, this.extra, this.onExtraClick, 'ix-header-extra')
    const avatar = renderAvatar(this.$slots.avatar, this.avatar, this.avatarSize)
    const title = renderTitle(this.$slots.default, this.title)
    const subTitle = renderSubTitle(this.$slots.subTitle, this.subTitle)
    const description = renderDescription(this.$slots.description, this.description, this.paddingLeft)
    return (
      <div class={this.classes}>
        <div ref="mainRef" class="ix-header-main">
          {bar}
          {prefix}
          {avatar}
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

const renderIcon = (
  slot: Slot | undefined,
  icon: string | VNode | undefined,
  onClick: (evt: MouseEvent) => void,
  wrapperClassName: string,
) => {
  if (!slot && !icon) {
    return null
  }

  let child: VNodeTypes

  if (slot) {
    child = slot()
  } else if (isVNode(icon)) {
    child = h(icon, { onClick: onClick })
  } else {
    child = <IxIcon name={icon} onClick={onClick} />
  }

  return <div class={wrapperClassName}>{child}</div>
}

const renderAvatar = (
  avatarSlot: Slot | undefined,
  avatar: string | AvatarProps | undefined,
  size: 'medium' | 'small',
) => {
  if (avatarSlot) {
    return avatarSlot()
  }
  if (avatar) {
    const avatarProps = isString(avatar) ? { icon: avatar } : avatar
    return <IxAvatar size={size} {...avatarProps}></IxAvatar>
  }
  return null
}

const renderTitle = (titleSlot: Slot | undefined, title: string | undefined) => {
  if (!titleSlot && !title) {
    return null
  }
  return (
    <span ref="titleRef" class="ix-header-title">
      {titleSlot ? titleSlot() : title}
    </span>
  )
}

const renderSubTitle = (slot: Slot | undefined, childText: string | undefined) => {
  if (!slot && !childText) {
    return null
  }
  return <span class="ix-header-sub-title">{slot ? slot() : childText}</span>
}

const renderDescription = (slot: Slot | undefined, childText: string | undefined, paddingLeft: string | number) => {
  if (!slot && !childText) {
    return null
  }
  return (
    <span class="ix-header-description" style={{ paddingLeft }}>
      {slot ? slot() : childText}
    </span>
  )
}
function useDescriptionPaddingLeft() {
  const mainRef = ref<HTMLDivElement>()
  const titleRef = ref<HTMLSpanElement>()
  const paddingLeft = ref('0px')

  const calcPaddingLeft = () => {
    const mainElement = mainRef.value
    const titleElement = titleRef.value
    let left: string | number
    if (!mainElement || !titleElement) {
      left = '0px'
    } else {
      left = toCssPixel(getOffset(titleElement, mainElement).left)
    }
    paddingLeft.value = left
  }

  onMounted(() => {
    watch(
      titleRef,
      (newEl, oldEl) => {
        offResize(oldEl, calcPaddingLeft)
        onResize(newEl, calcPaddingLeft)
        calcPaddingLeft()
      },
      { immediate: true },
    )
  })

  onBeforeUnmount(() => offResize(titleRef.value, calcPaddingLeft))

  return { mainRef, titleRef, paddingLeft }
}
