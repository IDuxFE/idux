import type { ComputedRef, CSSProperties, Ref, Slot, VNode, VNodeTypes } from 'vue'
import type { AvatarProps, AvatarSize } from './types'

import { computed, defineComponent, isVNode, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'

import { BreakpointKey, useBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, hasSlot, isNumber, isObject, isString, offResize, onResize, toCssPixel } from '@idux/cdk/utils'
import { AvatarConfig, useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { avatarProps } from './types'

export default defineComponent({
  name: 'IxAvatar',
  props: avatarProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('avatar')

    const showText = ref(false)
    watchEffect(() => {
      showText.value = !props.src && (!!props.text || hasSlot(slots))
    })

    const showIcon = ref(false)
    watchEffect(() => {
      showIcon.value = !props.src && !showText.value
    })

    const icon$$ = computed(() => props.icon ?? config.icon)

    const { avatarRef, textRef, size, avatarStyle, textStyle } = useSize(props, config)

    const classes = useClasses(props, config, size, showText, showIcon)

    const handleError = (evt: Event) => {
      const result = callEmit(props.onError, evt)

      if (result !== false && !evt.defaultPrevented) {
        if (!!props.text || hasSlot(slots)) {
          showText.value = true
        }
        showIcon.value = !showText.value
      }
    }

    return { avatarRef, textRef, showText, showIcon, icon$$, classes, avatarStyle, textStyle, handleError }
  },

  render() {
    let child: VNodeTypes

    if (this.showIcon) {
      child = renderIcon(this.$slots.icon, this.icon$$)
    } else if (this.showText) {
      const textChild = this.$slots.default?.() ?? this.text
      child = (
        <span ref="textRef" class="ix-avatar-text" style={this.textStyle}>
          {textChild}
        </span>
      )
    } else {
      child = <img src={this.src} srcset={this.srcset} alt={this.alt} onError={this.handleError} />
    }

    return (
      <span ref="avatarRef" class={this.classes} style={this.avatarStyle}>
        {child}
      </span>
    )
  },
})

const useClasses = (
  props: AvatarProps,
  config: AvatarConfig,
  size: ComputedRef<AvatarSize | Partial<Record<BreakpointKey, number>>>,
  showText: Ref<boolean>,
  showIcon: Ref<boolean>,
) => {
  return computed(() => {
    const shape = props.shape ?? config.shape
    const sizeValue = size.value
    return {
      'ix-avatar': true,
      'ix-avatar-image': !!props.src && !showText.value && !showIcon.value,
      [`ix-avatar-${shape}`]: true,
      [`ix-avatar-${sizeValue}`]: isString(sizeValue),
    }
  })
}

const useSizeStyle = (
  size: ComputedRef<AvatarSize | Partial<Record<BreakpointKey, number>>>,
): ComputedRef<CSSProperties> => {
  const screens = useBreakpoints()
  return computed(() => {
    let currSize: number | undefined

    const sizeValue = size.value
    if (isNumber(sizeValue)) {
      currSize = sizeValue
    } else if (isObject(sizeValue)) {
      const screensValue = screens.value
      const currBreakpoint = (Object.keys(screensValue) as BreakpointKey[]).find(key => screensValue[key])!
      currSize = sizeValue[currBreakpoint]
    }

    return getSizeStyle(currSize)
  })
}

const getSizeStyle = (size: number | undefined) => {
  if (!size) {
    return {}
  }
  const sizePixel = toCssPixel(size)
  return {
    width: sizePixel,
    height: sizePixel,
    lineHeight: sizePixel,
    fontSize: toCssPixel(size / 2),
  }
}

const renderIcon = (iconSlot?: Slot, icon?: string | VNode) => {
  if (iconSlot) {
    return iconSlot()
  }

  return isVNode(icon) ? icon : <IxIcon name={icon}></IxIcon>
}

const useSize = (props: AvatarProps, config: AvatarConfig) => {
  const avatarRef = ref<HTMLSpanElement>()
  const textRef = ref<HTMLSpanElement>()

  const size = computed(() => props.size ?? config.size)
  const gap = computed(() => props.gap ?? config.gap)

  const avatarStyle = useSizeStyle(size)
  const textScale = ref(1)
  const textStyle = computed(() => ({
    transform: `scale(${textScale.value}) translateX(-50%)`,
    lineHeight: avatarStyle.value.lineHeight,
  }))

  const calcTextSize = () => {
    const avatarElement = avatarRef.value
    const textElement = textRef.value
    if (!avatarElement || !textElement) {
      return
    }

    const avatarWidth = avatarElement.offsetWidth
    const textWidth = textElement.offsetWidth
    const gapWidth = gap.value * 2
    if (avatarWidth !== 0 && textWidth !== 0 && gapWidth < avatarWidth) {
      textScale.value = avatarWidth - gapWidth < textWidth ? (avatarWidth - gapWidth) / textWidth : 1
    }
  }

  onMounted(() => {
    watch(
      textRef,
      (newEl, oldEl) => {
        offResize(oldEl, calcTextSize)
        onResize(newEl, calcTextSize)
        calcTextSize()
      },
      { immediate: true },
    )

    watch(gap, () => calcTextSize(), { immediate: true })
  })

  onBeforeUnmount(() => offResize(textRef.value, calcTextSize))

  return { avatarRef, textRef, size, calcTextSize, avatarStyle, textStyle }
}
