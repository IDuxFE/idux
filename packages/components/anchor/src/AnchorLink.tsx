/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, watch } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { anchorToken } from './token'
import { linkProps } from './types'

export default defineComponent({
  name: 'IxAnchorLink',
  props: linkProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor-link`)

    const { registerLink, unregisterLink, activeLink, handleLinkClick } = inject(anchorToken)!
    watch(
      () => props.href,
      (newHref, oldHref) => {
        unregisterLink(oldHref)
        registerLink(newHref)
      },
    )
    onMounted(() => registerLink(props.href))
    onBeforeUnmount(() => unregisterLink(props.href))

    const isActive = computed(() => activeLink.value === props.href)
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [`${prefixCls}-title`]: true,
        [`${prefixCls}-title-active`]: isActive.value,
      }
    })

    const onClick = (evt: MouseEvent) => handleLinkClick(evt, props)

    return () => {
      const { href, title } = props
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={prefixCls}>
          <a class={classes.value} href={href} data-href={href} title={title} onClick={onClick}>
            {slots.title?.() ?? title}
          </a>
          {slots.default?.()}
        </div>
      )
    }
  },
})
