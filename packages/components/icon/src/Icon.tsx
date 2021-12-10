/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconProps } from './types'
import type { IconConfig } from '@idux/components/config'

import { computed, defineComponent, onMounted, ref, watch } from 'vue'

import { isNumeric } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { iconProps } from './types'
import { clearSVGElement, covertSVGNode, loadSVGElement, loadSvgElementFormScript } from './utils'

export default defineComponent({
  name: 'IxIcon',
  props: iconProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`)
    const config = useGlobalConfig('icon')

    const root = ref<HTMLElement>()

    onMounted(() => appendChild(props, config, root.value!))

    watch([() => props.name, () => props.iconfont], () => {
      const rootElement = root.value
      if (!rootElement) {
        return
      }
      clearSVGElement(rootElement)
      appendChild(props, config, rootElement)
    })

    watch(
      () => props.rotate,
      rotate => {
        const firstChild = root.value?.firstElementChild
        if (firstChild) {
          handleRotate(firstChild as SVGElement, rotate)
        }
      },
    )

    const classes = computed(() => {
      const { name, rotate } = props
      const isSpin = name === 'loading' || (typeof rotate === 'boolean' && rotate)
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-${name}`]: !!name,
        [`${prefixCls}-spin`]: isSpin,
      }
    })

    return () => {
      const { name } = props
      if (name) {
        return <i ref={root} class={classes.value} role="img" aria-label={name}></i>
      } else {
        return (
          <i ref={root} class={classes.value} role="img">
            {covertSVGNode(slots.default?.())}
          </i>
        )
      }
    }
  },
})

async function appendChild(props: IconProps, config: IconConfig, rootElement: HTMLElement): Promise<void> {
  const { name, iconfont, rotate } = props
  if (name) {
    const svgElement = iconfont
      ? await loadSvgElementFormScript(name)
      : await loadSVGElement(name, config.loadIconDynamically)
    if (svgElement) {
      handleRotate(svgElement, rotate)
      rootElement.appendChild(svgElement)
    }
  }
}

function handleRotate(svg: SVGElement, rotate?: number | string | boolean): void {
  if (isNumeric(rotate)) {
    svg.setAttribute('style', `transform: rotate(${rotate}deg)`)
  } else {
    svg.removeAttribute('style')
  }
}
