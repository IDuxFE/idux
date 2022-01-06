/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ImageViewerContentProps } from '../types'
import type { ImageViewerConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, defineComponent, normalizeClass, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'

import { debounce } from 'lodash-es'

import { isFirefox } from '@idux/cdk/platform'
import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { imageViewerContentProps } from '../types'

const mousewheelEventName = isFirefox ? 'DOMMouseScroll' : 'mousewheel'
const debounceTime = 10

type ScaleType = 'in' | 'out'
type RotateType = 'left' | 'right'
type GoType = 'previous' | 'next'

interface OprType {
  icon: string
  key: string
  opr: () => void
  visible: boolean
  disabled?: boolean
}

export default defineComponent({
  name: 'IxImageViewerContent',
  props: imageViewerContentProps,
  setup(props) {
    const config = useGlobalConfig('imageViewer')
    const zoom = useZoomRange(props, config)
    const maskClosable = useMaskClosable(props, config)
    const [visible, setVisible] = useControlledProp(props, 'visible', false)
    const { calcTransform, scaleDisabled, rotateHandle, scaleHandle, resetTransform } = useStyleOpr(zoom)
    const { activeIndex, switchDisabled, switchVisible, goHandle } = useSwitch(props, config)
    const oprList = useOprList(
      {
        goNext: () => goHandle('next'),
        goPrevious: () => goHandle('previous'),
        rotateLeft: () => rotateHandle('left'),
        rotateRight: () => rotateHandle('right'),
        zoomOut: () => scaleHandle('out'),
        zoomIn: () => scaleHandle('in'),
        close: () => setVisible(false),
      },
      scaleDisabled,
      switchDisabled,
      switchVisible,
    )
    const { onWheelScroll, onKeydown } = getImageEvent(visible, { setVisible, scaleHandle, goHandle })
    const onClickLayer = () => maskClosable.value && setVisible(false)

    onMounted(() => {
      window.addEventListener(mousewheelEventName, onWheelScroll, { passive: false, capture: false })
      window.addEventListener('keydown', onKeydown, false)
    })

    onBeforeUnmount(() => {
      window.removeEventListener(mousewheelEventName, onWheelScroll)
      window.removeEventListener('keydown', onKeydown)
    })

    watch([visible, activeIndex], ([visible$$]) => {
      visible$$ && resetTransform()
    })

    return () => (
      <div class={props.mergedPrefixCls}>
        {renderOprNode(props, oprList)}
        {renderPreviewImg(props, calcTransform, activeIndex, onClickLayer)}
      </div>
    )
  },
})

function renderOprNode(props: ImageViewerContentProps, oprList: ComputedRef<OprType[]>) {
  return (
    <div class={`${props.mergedPrefixCls}-opr`}>
      {oprList.value
        .filter(item => item.visible)
        .map(item => {
          const iconClasses = computed(() =>
            normalizeClass([
              `${props.mergedPrefixCls}-opr-item`,
              { [`${props.mergedPrefixCls}-opr-item-disabled`]: item.disabled },
            ]),
          )
          return <IxIcon class={iconClasses.value} name={item.icon} onClick={item.opr} key={item.key}></IxIcon>
        })}
    </div>
  )
}

function renderPreviewImg(
  props: ImageViewerContentProps,
  calcTransform: ComputedRef<Record<string, string>>,
  activeIndex: ComputedRef<number>,
  onClickLayer: () => void,
) {
  const curImgSrc = (props.images ?? [])[activeIndex.value]
  return (
    <div class={`${props.mergedPrefixCls}-preview`} onClick={onClickLayer}>
      <img class={`${props.mergedPrefixCls}-preview-img`} src={curImgSrc} style={calcTransform.value} />
    </div>
  )
}

function useOprList(
  { goNext, goPrevious, rotateLeft, rotateRight, zoomOut, zoomIn, close }: Record<string, () => void>,
  scaleDisabled: ComputedRef<Record<ScaleType, boolean>>,
  switchDisabled: ComputedRef<Record<GoType, boolean>>,
  switchVisible: ComputedRef<boolean>,
): ComputedRef<OprType[]> {
  return computed(() => [
    {
      key: 'goPrevious',
      icon: 'left',
      opr: goPrevious,
      disabled: switchDisabled.value.previous,
      visible: switchVisible.value,
    },
    { key: 'goNext', icon: 'right', opr: goNext, disabled: switchDisabled.value.next, visible: switchVisible.value },
    { key: 'rotateLeft', icon: 'rotate-left', opr: rotateLeft, visible: true },
    { key: 'rotateRight', icon: 'rotate-right', opr: rotateRight, visible: true },
    { key: 'zoomOut', icon: 'zoom-out', opr: zoomOut, disabled: scaleDisabled.value.out, visible: true },
    { key: 'zoomIn', icon: 'zoom-in', opr: zoomIn, disabled: scaleDisabled.value.in, visible: true },
    { key: 'close', icon: 'close', opr: close, visible: true },
  ])
}

function useSwitch(props: ImageViewerContentProps, config: ImageViewerConfig) {
  const [activeIndex, setIndex] = useControlledProp(props, 'activeIndex', 0)
  const loop = computed(() => props.loop ?? config.loop)
  const switchDisabled = computed(() => ({
    previous: !loop.value && activeIndex.value === 0,
    next: !loop.value && activeIndex.value === props.images.length - 1,
  }))
  const switchVisible = computed(() => props.images.length > 1)
  const goHandle = debounce((direction: GoType = 'next') => {
    if (direction === 'next') {
      if (switchDisabled.value.next) {
        return
      }
      setIndex(activeIndex.value >= props.images.length - 1 ? 0 : activeIndex.value + 1)
      return
    }
    if (switchDisabled.value.previous) {
      return
    }
    setIndex(activeIndex.value <= 0 ? props.images.length - 1 : activeIndex.value - 1)
  }, debounceTime)

  return {
    activeIndex,
    switchDisabled,
    switchVisible,
    goHandle,
  }
}

function useStyleOpr(zoom: ComputedRef<number[]>) {
  const initScale = computed(() => getInitScale(zoom.value))
  const initRotate = 0
  const scale = ref(1)
  const rotate = ref(initRotate)
  const rotateFactor = {
    left: -1,
    right: 1,
  } as const
  const scaleFactor = {
    in: 1,
    out: -1,
  }

  watchEffect(() => (scale.value = initScale.value))

  const scaleDisabled = computed(() => ({
    in: scale.value >= zoom.value[1],
    out: scale.value <= zoom.value[0],
  }))
  const calcTransform = computed(() => ({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` }))

  const rotateHandle = debounce((direction: RotateType = 'left', rotateStep = 90) => {
    rotate.value = rotate.value + rotateStep * rotateFactor[direction]
  }, debounceTime)

  const scaleHandle = debounce((direction: ScaleType, scaleStep = 0.2) => {
    if (scaleDisabled.value[direction]) {
      return
    }
    scale.value = scale.value + scaleStep * scaleFactor[direction]
  }, debounceTime)

  const resetTransform = () => {
    scale.value = initScale.value
    rotate.value = initRotate
  }

  return {
    calcTransform,
    scaleDisabled,
    rotateHandle,
    scaleHandle,
    resetTransform,
  }
}

function useZoomRange(props: ImageViewerContentProps, config: ImageViewerConfig) {
  return computed(() => props.zoom ?? config.zoom)
}

function useMaskClosable(props: ImageViewerContentProps, config: ImageViewerConfig) {
  return computed(() => props.maskClosable ?? config.maskClosable)
}

function getImageEvent(
  visible: Ref<boolean>,
  {
    setVisible,
    scaleHandle,
    goHandle,
  }: {
    setVisible: (visible: boolean) => void
    scaleHandle: (direction: ScaleType, step?: number) => void
    goHandle: (direction: GoType) => void
  },
) {
  const scroll = (e: WheelEvent | Event) => {
    if (!visible.value) {
      return
    }
    const event = e as WheelEvent & { wheelDelta?: number }
    event.preventDefault()
    const delta = event.wheelDelta ?? -event.detail
    if (delta > 0) {
      scaleHandle('in', 0.2)
    } else {
      scaleHandle('out', 0.2)
    }
  }

  const keyHandle: Record<string, () => void> = {
    ArrowUp: () => scaleHandle('in', 0.2),
    ArrowDown: () => scaleHandle('out', 0.2),
    ArrowLeft: () => goHandle('previous'),
    ArrowRight: () => goHandle('next'),
    Escape: () => setVisible(false),
  }
  const keyDown = (e: KeyboardEvent) => {
    if (!visible.value) {
      return
    }
    e.preventDefault()
    if (e.code in keyHandle) {
      keyHandle[e.code]()
    }
  }

  return {
    onWheelScroll: scroll,
    onKeydown: keyDown,
  }
}

function getInitScale(zoom: number[]) {
  const defaultScale = 1
  if (zoom[0] > defaultScale) {
    return zoom[0]
  }
  if (zoom[1] < defaultScale) {
    return zoom[1]
  }
  return defaultScale
}
