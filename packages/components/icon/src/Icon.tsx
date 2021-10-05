import type { Ref } from 'vue'
import type { IconConfig } from '@idux/components/config'
import type { IconProps } from './types'

import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { isNumeric } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { clearSVGElement, loadIconFontSvgElement, loadSVGElement } from './utils'
import { iconProps } from './types'

export default defineComponent({
  name: 'IxIcon',
  props: iconProps,
  setup(props) {
    const root = ref(null as unknown as HTMLElement)
    const iconConfig = useGlobalConfig('icon')
    onMounted(() => appendChild(props, iconConfig, root))

    watchName(props, iconConfig, root)
    watchRotate(props, root)

    const classes = useClasses(props)
    return { root, classes }
  },
  render() {
    if (this.name) {
      return <i ref="root" class={this.classes} role="img" aria-label={this.name}></i>
    } else {
      return (
        <i ref="root" class={this.classes} role="img">
          {this.$slots.default?.()}
        </i>
      )
    }
  },
})

function watchName(props: IconProps, iconConfig: IconConfig, root: Ref<HTMLElement>) {
  watch([() => props.name, () => props.iconfont], () => {
    clearSVGElement(root.value)
    appendChild(props, iconConfig, root)
  })
}

function watchRotate(props: IconProps, root: Ref<HTMLElement>) {
  watch(
    () => props.rotate,
    rotate => {
      const firstChild = root.value.firstElementChild as SVGElement
      if (firstChild) {
        handleRotate(firstChild, rotate)
      }
    },
  )
}

async function appendChild(props: IconProps, iconConfig: IconConfig, root: Ref<HTMLElement>): Promise<void> {
  const { name, iconfont, rotate } = props
  if (name) {
    const svgElement = iconfont
      ? loadIconFontSvgElement(name)
      : await loadSVGElement(name, iconConfig.loadIconDynamically)
    if (svgElement) {
      handleRotate(svgElement, rotate)
      root.value?.appendChild(svgElement)
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

const useClasses = (props: IconProps) => {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const { name, rotate } = props
    const isSpin = name === 'loading' || (typeof rotate === 'boolean' && rotate)
    return {
      [`${prefixCls}-icon`]: true,
      [`${prefixCls}-icon-${name}`]: !!name,
      [`${prefixCls}-icon-spin`]: isSpin,
    }
  })
}
