/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, normalizeClass, onMounted, ref, watch } from 'vue'

import { convertCssPixel, isNumeric } from '@idux/cdk/utils'
import { type IconConfig, useGlobalConfig } from '@idux/components/config'

import { type IconProps, iconProps } from './types'
import { clearSVGElement, convertSVGNode, loadSVGElement, loadSvgElementFormScript } from './utils'

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

    const classes = computed(() => {
      const { name, rotate } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${name}`]: !!name,
        [`${prefixCls}-spinning`]: rotate === true,
      })
    })

    const style = computed<CSSProperties>(() => {
      const { rotate, color, size } = props
      return {
        color,
        fontSize: convertCssPixel(size),
        transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : undefined,
      }
    })

    return () => {
      const { name } = props
      if (name) {
        return <i ref={root} class={classes.value} style={style.value} role="img" aria-label={name}></i>
      } else {
        return (
          <i ref={root} class={classes.value} style={style.value} role="img">
            {convertSVGNode(slots.default?.())}
          </i>
        )
      }
    }
  },
})

async function appendChild(props: IconProps, config: IconConfig, rootElement: HTMLElement): Promise<void> {
  const { name, iconfont } = props
  if (name) {
    const svgElement = iconfont
      ? await loadSvgElementFormScript(name)
      : await loadSVGElement(name, config.loadIconDynamically)
    // TODO: refactor this
    if (svgElement && name === props.name) {
      rootElement.appendChild(svgElement)
    }
  }
}
