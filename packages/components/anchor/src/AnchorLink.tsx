import { computed, defineComponent, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { linkProps } from './types'
import { anchorToken } from './token'

export default defineComponent({
  name: 'IxAnchorLink',
  props: linkProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
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
      return {
        [`${prefixCls}-anchor-link-title`]: true,
        [`${prefixCls}-anchor-link-title-active`]: isActive.value,
      }
    })

    const onClick = (evt: MouseEvent) => handleLinkClick(evt, props)

    return () => {
      const { href, title } = props
      return (
        <div class={`${prefixCls}-anchor-link`}>
          <a class={classes.value} href={href} data-href={href} title={title} onClick={onClick}>
            {slots.title?.() ?? title}
          </a>
          {slots.default?.()}
        </div>
      )
    }
  },
})
