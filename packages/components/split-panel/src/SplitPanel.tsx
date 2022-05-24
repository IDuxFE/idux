/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type Ref,
  VNode,
  computed,
  defineComponent,
  normalizeClass,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from 'vue'

import { isNil } from 'lodash-es'

import { offResize, onResize } from '@idux/cdk/resize'
import { Logger, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import Splitter from './Splitter'
import { splitPanelToken } from './token'
import { type SplitAreaProps, splitPanelProps } from './types'

export default defineComponent({
  name: 'IxSplitPanel',
  props: splitPanelProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-split-panel`)

    const containerRef = ref<HTMLDivElement>()
    const containerSize = ref(0)
    const scale = ref(1)
    const areaSizeArray: Ref<(number | undefined)[]> = ref([])
    const areaMinSizeArray: Ref<number[]> = ref([])

    const getContainerSize = () => {
      if (!containerRef.value) {
        return 0
      }
      return props.vertical ? containerRef.value.clientHeight : containerRef.value.clientWidth
    }

    const initSize = () => {
      const setWidthArray = areaSizeArray.value.filter(Boolean) as number[]
      const notSetSizeArrayLength = areaSizeArray.value.length - setWidthArray.length
      const defaultWidth =
        (containerSize.value -
          setWidthArray.reduce((total, item) => {
            return total + item
          }, 0) -
          props.splitterSize * areaSizeArray.value.length -
          1) /
        notSetSizeArrayLength
      if (notSetSizeArrayLength) {
        areaSizeArray.value.forEach((width, index) => {
          if (isNil(width)) {
            areaSizeArray.value[index] = defaultWidth
          }
        })
      }
    }

    const syncSize = () => {
      if (containerRef.value) {
        scale.value = getContainerSize() / containerSize.value
        if (scale.value !== 1) {
          for (let i = 0; i < areaSizeArray.value.length; i++) {
            areaSizeArray.value[i] = (areaSizeArray.value[i] ?? 0) * scale.value
            areaMinSizeArray.value[i] = areaMinSizeArray.value[i] * scale.value
          }
          containerSize.value = getContainerSize()
        }
      }
    }

    const classes = computed(() => {
      return normalizeClass({
        [mergedPrefixCls.value]: true,
        [`${mergedPrefixCls.value}-vertical`]: props.vertical,
      })
    })

    provide(splitPanelToken, {
      prefixCls: mergedPrefixCls,
      props,
      containerSize,
      areaSizeArray,
      areaMinSizeArray,
    })

    onMounted(() => {
      containerSize.value = getContainerSize()
      initSize()
      onResize(containerRef.value, syncSize)
    })

    onBeforeUnmount(() => {
      offResize(containerRef.value, syncSize)
    })

    return () => {
      const children: VNode[] = []
      const areaNodes = flattenNode(slots.default?.(), { key: '__IDUX_SPLIT_AREA' })
      if (areaNodes.length <= 1) {
        __DEV__ && Logger.warn('components/split-panel', `Must have more than 1 child node.`)
      }
      areaNodes.forEach((node, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(node as any).index = index
        children.push(node)

        //areaSizeArray.value[index] = preAreaProps.size
        //areaMinSizeArray.value[index] = preAreaProps.minSize ?? 30

        if (index !== areaNodes.length - 1) {
          const preAreaProps = (node.props ?? {}) as SplitAreaProps
          const nextAreaProps = (areaNodes[index + 1].props ?? {}) as SplitAreaProps

          children.push(
            <Splitter
              index={index}
              onPreAreaTouchedMinSizeChange={preAreaProps.onTouchedMinSizeChange}
              onNextAreaTouchedMinSizeChange={nextAreaProps.onTouchedMinSizeChange}
            />,
          )
        }
      })

      return (
        <div ref={containerRef} class={classes.value}>
          {children}
        </div>
      )
    }
  },
})
