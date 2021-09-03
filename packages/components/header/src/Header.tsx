import type { ComputedRef, Slot, VNode } from 'vue'
import type { AvatarProps } from '@idux/components/avatar'
import type { HeaderProps } from './types'

import { computed, defineComponent, h, isVNode } from 'vue'
import { isString } from 'lodash-es'
import { callEmit } from '@idux/cdk/utils'
import { IxAvatar } from '@idux/components/avatar'
import { IxIcon } from '@idux/components/icon'
import { headerProps } from './types'

const avatarSizeTransformMap = {
  xLarge: 'medium',
  large: 'medium',
  medium: 'small',
  small: 'small',
} as const

export default defineComponent({
  name: 'IxHeader',
  props: headerProps,
  setup(props, { slots }) {
    const classes = useClasses(props)
    const avatarSize = computed(() => avatarSizeTransformMap[props.size])

    const onPrefixClick = (evt: MouseEvent) => callEmit(props.onPrefixClick, evt)
    const onSuffixClick = (evt: MouseEvent) => callEmit(props.onSuffixClick, evt)

    return () => {
      const { showBar, prefix, suffix, avatar, title, subTitle } = props
      return (
        <div class={classes.value}>
          <div class="ix-header-main">
            {showBar ? <span class="ix-header-bar"></span> : null}
            {renderIcon(slots.prefix, prefix, onPrefixClick, 'ix-header-prefix')}
            {renderAvatar(slots.avatar, avatar, avatarSize)}
            {renderTitle(slots.default, title, 'ix-header-title')}
            {renderTitle(slots.subTitle, subTitle, 'ix-header-sub-title')}
            {renderIcon(slots.suffix, suffix, onSuffixClick, 'ix-header-suffix')}
          </div>
          {slots.description ? <div class="ix-header-description">{slots.description()}</div> : null}
        </div>
      )
    }
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
  const iconNode = slot ? (
    slot()
  ) : isVNode(icon) ? (
    h(icon as VNode, { onClick })
  ) : (
    <IxIcon name={icon} onClick={onClick} />
  )
  return <div class={wrapperClassName}>{iconNode}</div>
}

const renderTitle = (slot: Slot | undefined, title: string | undefined, wrapperClassName: string) => {
  if (!slot && !title) {
    return null
  }
  return <span class={wrapperClassName}>{slot?.() ?? title}</span>
}

const renderAvatar = (
  slot: Slot | undefined,
  avatar: string | AvatarProps | undefined,
  size: ComputedRef<'medium' | 'small'>,
) => {
  if (slot) {
    return slot()
  }

  if (!avatar) {
    return null
  }

  const avatarProps = isString(avatar) ? { icon: avatar } : avatar
  return <IxAvatar size={size.value} {...avatarProps}></IxAvatar>
}
