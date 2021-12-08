/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AvatarProps, AvatarSize } from './types'
import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { AvatarConfig } from '@idux/components/config'
import type { CSSProperties, ComputedRef, Ref, Slot, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent, isVNode, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'

import { isNumber, isObject, isString } from 'lodash-es'

import { useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { callEmit, convertCssPixel, hasSlot, offResize, onResize } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { avatarProps } from './types'

export default defineComponent({
  name: 'IxAvatar',
  props: avatarProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-avatar`)
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

    const classes = useClasses(props, config, size, showText, showIcon, mergedPrefixCls)

    const handleError = (evt: Event) => {
      const result = callEmit(props.onError, evt)

      if (result !== false && !evt.defaultPrevented) {
        if (!!props.text || hasSlot(slots)) {
          showText.value = true
        }
        showIcon.value = !showText.value
      }
    }

    return () => {
      let child: VNodeTypes

      const prefixCls = mergedPrefixCls.value

      if (showIcon.value) {
        child = renderIcon(slots.icon, icon$$.value)
      } else if (showText.value) {
        const textChild = slots.default?.() ?? props.text
        child = (
          <span ref={textRef} class={`${prefixCls}-text`} style={textStyle.value}>
            {textChild}
          </span>
        )
      } else {
        child = <img src={props.src} srcset={props.srcset} alt={props.alt} onError={handleError} />
      }

      return (
        <span ref={avatarRef} class={classes.value} style={avatarStyle.value}>
          {child}
        </span>
      )
    }
  },
})

const useClasses = (
  props: AvatarProps,
  config: AvatarConfig,
  size: ComputedRef<AvatarSize | Partial<Record<BreakpointKey, number>>>,
  showText: Ref<boolean>,
  showIcon: Ref<boolean>,
  mergedPrefixCls: ComputedRef<string>,
) => {
  return computed(() => {
    const shape = props.shape ?? config.shape
    const sizeValue = size.value
    const prefixCls = mergedPrefixCls.value
    return {
      [`${prefixCls}`]: true,
      [`${prefixCls}-image`]: !!props.src && !showText.value && !showIcon.value,
      [`${prefixCls}-${shape}`]: true,
      [`${prefixCls}-${sizeValue}`]: isString(sizeValue),
    }
  })
}

const useSizeStyle = (
  size: ComputedRef<AvatarSize | Partial<Record<BreakpointKey, number>>>,
): ComputedRef<CSSProperties> => {
  const breakpoints = useSharedBreakpoints()
  return computed(() => {
    let currSize: number | undefined

    const sizeValue = size.value
    if (isNumber(sizeValue)) {
      currSize = sizeValue
    } else if (isObject(sizeValue)) {
      const currBreakpoint = (Object.keys(breakpoints) as BreakpointKey[]).find(key => breakpoints[key])!
      currSize = sizeValue[currBreakpoint]
    }

    return getSizeStyle(currSize)
  })
}

const getSizeStyle = (size: number | undefined) => {
  if (!size) {
    return {}
  }
  const sizePixel = convertCssPixel(size)
  return {
    width: sizePixel,
    height: sizePixel,
    lineHeight: sizePixel,
    fontSize: convertCssPixel(size / 2),
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
