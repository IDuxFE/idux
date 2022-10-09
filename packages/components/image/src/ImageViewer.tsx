/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Ref, Transition, computed, defineComponent, onBeforeUnmount, onMounted, toRef, watch } from 'vue'

import { isFirefox } from '@idux/cdk/platform'
import { CdkPortal } from '@idux/cdk/portal'
import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { usePortalTarget, useZIndex } from '@idux/components/utils'

import { useImgStyleOpr, useImgSwitch, useOprList } from './composables/useOpr'
import OprIcon from './contents/OprIcon'
import { imageViewerProps } from './types'

const mousewheelEventName = isFirefox ? 'DOMMouseScroll' : 'mousewheel'

type ScaleType = 'in' | 'out'
type GoType = 'previous' | 'next'

export default defineComponent({
  name: 'IxImageViewer',
  props: imageViewerProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('imageViewer')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-image-viewer`)
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls)

    const [visible, setVisible] = useControlledProp(props, 'visible', false)
    const { currentZIndex } = useZIndex(toRef(props, 'zIndex'), toRef(common, 'overlayZIndex'), visible)

    const zoom = computed(() => props.zoom ?? config.zoom)
    const loop = computed(() => props.loop ?? config.loop)
    const maskClosable = computed(() => props.maskClosable ?? config.maskClosable)

    const { transformStyle, scaleDisabled, rotateHandle, scaleHandle, resetTransform } = useImgStyleOpr(zoom)
    const { activeIndex, switchDisabled, switchVisible, goHandle } = useImgSwitch(props, loop)

    const onClickLayer = () => maskClosable.value && setVisible(false)

    const oprList = useOprList(
      goHandle,
      rotateHandle,
      scaleHandle,
      setVisible,
      scaleDisabled,
      switchDisabled,
      switchVisible,
    )

    const { onWheelScroll, onKeydown } = getImageEvent(visible, setVisible, scaleHandle, goHandle)

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

    const style = computed(() => `z-index: ${currentZIndex.value}`)

    return () => {
      const prefixCls = mergedPrefixCls.value
      const curImgSrc = props.images[activeIndex.value]

      return (
        <CdkPortal target={mergedPortalTarget.value} load={visible.value}>
          <Transition name={`${common.prefixCls}-zoom-big-fast`} appear>
            {visible.value && (
              <div class={prefixCls} style={style.value}>
                <div class={`${prefixCls}-opr`}>
                  {oprList.value
                    .filter(item => item.visible)
                    .map(item => {
                      const oprIconProps = {
                        ...item,
                        prefixCls,
                      }
                      return <OprIcon {...oprIconProps} />
                    })}
                </div>
                <div class={`${prefixCls}-preview`} onClick={onClickLayer}>
                  <img class={`${prefixCls}-preview-img`} src={curImgSrc} style={transformStyle.value} />
                </div>
              </div>
            )}
          </Transition>
        </CdkPortal>
      )
    }
  },
})

function getImageEvent(
  visible: Ref<boolean>,
  setVisible: (visible: boolean) => void,
  scaleHandle: (direction: ScaleType, step?: number) => void,
  goHandle: (direction: GoType) => void,
) {
  const onWheelScroll = (e: WheelEvent | Event) => {
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

  const onKeydown = (e: KeyboardEvent) => {
    if (!visible.value) {
      return
    }
    e.preventDefault()
    if (e.code in keyHandle) {
      keyHandle[e.code]()
    }
  }

  return {
    onWheelScroll,
    onKeydown,
  }
}
