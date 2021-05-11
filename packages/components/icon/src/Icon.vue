<template>
  <component :is="tag" ref="root" :class="classes" role="img" :ariaLabel="name">
    <slot></slot>
  </component>
</template>
<script lang="ts">
import type { Ref, SetupContext } from 'vue'
import type { IconConfig } from '@idux/components/config'
import type { IconProps } from './types'

import { computed, defineComponent, onMounted, onUpdated, ref, watch } from 'vue'
import { isNumeric, PropTypes, withUndefined } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { clearSVGElement, loadIconFontSvgElement, loadSVGElement } from './utils'

export default defineComponent({
  name: 'IxIcon',
  props: {
    name: PropTypes.string,
    rotate: withUndefined(PropTypes.oneOfType([Boolean, Number, String])),
    iconfont: PropTypes.bool,
  },
  setup(props: IconProps, { attrs }: SetupContext) {
    const root = ref(null as unknown as HTMLElement)
    const iconConfig = useGlobalConfig('icon')
    onMounted(() => appendChild(props, iconConfig, root))

    watchName(props, iconConfig, root)
    watchRotate(props, root)

    const tag = ref(attrs.onClick ? 'button' : 'i')
    onUpdated(() => {
      tag.value = attrs.onClick ? 'button' : 'i'
    })

    const classes = useClasses(props)
    return { root, tag, classes }
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
  return computed(() => {
    const isSpin = props.name === 'loading' || (typeof props.rotate === 'boolean' && props.rotate)
    return ['ix-icon', props.name ? `ix-icon-${props.name}` : '', isSpin ? 'ix-icon-spin' : '']
  })
}
</script>
