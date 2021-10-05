import type { Ref } from 'vue'
import type { AnchorConfig } from '@idux/components/config'
import type { AnchorLinkProps, AnchorProps } from './types'

import { computed, defineComponent, onBeforeUnmount, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { scrollToTop } from '@idux/cdk/scroll'
import { callEmit, getOffset, off, on } from '@idux/cdk/utils'
import { IxAffix } from '@idux/components/affix'
import { useGlobalConfig } from '@idux/components/config'
import { getTarget } from '@idux/components/utils'
import { anchorToken } from './token'
import { anchorProps } from './types'

export default defineComponent({
  name: 'IxAnchor',
  props: anchorProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const config = useGlobalConfig('anchor')
    const hideLinkBall = computed(() => props.hideLinkBall ?? config.hideLinkBall)
    const wrapperStyle = computed(() => {
      const { offsetTop } = props
      return { maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh' }
    })

    const { activeLink } = useLinks(props, config)
    const { anchorRef, inkBallClasses, inkBallTop } = useInkBall(activeLink)

    return () => {
      const linkBall = hideLinkBall.value ? null : (
        <span class={inkBallClasses.value} style={{ top: inkBallTop.value }} />
      )

      const anchorNode = (
        <div class={`${prefixCls}-anchor-wrapper`} style={wrapperStyle.value}>
          <div class={`${prefixCls}-anchor`} ref={anchorRef}>
            <div class={`${prefixCls}-anchor-ink`}>{linkBall}</div>
            {slots.default?.()}
          </div>
        </div>
      )

      if (!props.affix) {
        return anchorNode
      }
      return (
        <IxAffix target={props.target} offset={props.offsetTop}>
          {anchorNode}
        </IxAffix>
      )
    }
  },
})

const useLinks = (props: AnchorProps, config: AnchorConfig) => {
  const links = ref<string[]>([])
  const registerLink = (link: string) => {
    if (!links.value.includes(link)) {
      links.value.push(link)
    }
  }

  const unregisterLink = (link: string) => {
    const index = links.value.indexOf(link)
    if (index !== -1) {
      links.value.splice(index, 1)
    }
  }

  const activeLink = ref<string>()

  const setActiveLink = (link: string) => {
    if (activeLink.value !== link) {
      activeLink.value = link
      callEmit(props.onChange, link)
    }
  }

  const { scrollTo } = useScroll(props, config, links, setActiveLink)

  const handleLinkClick = (evt: MouseEvent, linkProps: AnchorLinkProps) => {
    callEmit(props.onClick, evt, linkProps)
    scrollTo(linkProps.href)
  }

  provide(anchorToken, { registerLink, unregisterLink, activeLink, handleLinkClick })

  return { activeLink }
}

const useInkBall = (activeLink: Ref<string | undefined>) => {
  const { prefixCls } = useGlobalConfig('common')
  const anchorRef = ref<HTMLDivElement>()
  const inkBallClasses = computed(() => {
    return {
      [`${prefixCls}-anchor-ink-ball`]: true,
      [`${prefixCls}-anchor-ink-ball-visible`]: !!activeLink.value,
    }
  })

  const inkBallTop = ref<string>()

  onMounted(() => {
    watchEffect(() => {
      const activeLinkElement = anchorRef.value?.querySelector(`a[data-href="${activeLink.value}"]`) as HTMLElement
      if (!activeLinkElement) {
        return
      }
      const { offsetTop, clientHeight } = activeLinkElement as HTMLElement
      inkBallTop.value = `${offsetTop + clientHeight / 2 - 4.5}px`
    })
  })

  return {
    anchorRef,
    inkBallClasses,
    inkBallTop,
  }
}

const getTargetTop = (link: string, container: HTMLElement | Window): number | null => {
  const targetElement = document.getElementById(link.split('#')[1])
  if (targetElement) {
    const { top } = getOffset(targetElement, container)
    return top
  }
  return null
}

const getCurrentAnchor = (
  links: string[],
  container: HTMLElement | Window,
  offsetTop: number,
  bounds: number,
): string => {
  const maxSection = links.reduce(
    (curr, link) => {
      const top = getTargetTop(link, container)
      if (top !== null && top < offsetTop + bounds && curr.top < top) {
        return { link, top }
      }
      return curr
    },
    { link: '', top: Number.MIN_SAFE_INTEGER },
  )

  return maxSection.link
}

const useScroll = (
  props: AnchorProps,
  config: AnchorConfig,
  links: Ref<string[]>,
  setActiveLink: (link: string) => void,
): { scrollTo: (link: string) => void } => {
  const bounds = computed(() => props.bounds ?? config.bounds)
  const container = ref<Window | HTMLElement>()
  const eventType = 'scroll'
  let animating = false

  const targetOffset = computed(() => props.targetOffset ?? props.offsetTop ?? 0)

  // 鼠标滚动监听
  const handleScroll = () => {
    if (animating) {
      return
    }
    const currLink = getCurrentAnchor(links.value, container.value!, targetOffset.value, bounds.value)
    setActiveLink(currLink)
  }

  const scrollTo = (link: string) => {
    setActiveLink(link)

    const top = getTargetTop(link, container.value!)
    if (top === null) {
      return
    }

    animating = true

    scrollToTop({
      amountOfChange: top - targetOffset.value,
      target: container.value,
      callback: () => {
        animating = false
      },
    })
  }

  watch(
    () => props.target,
    () => {
      off(container.value, eventType, handleScroll)
      container.value = getTarget(props.target)
      on(container.value, eventType, handleScroll)
      handleScroll()
    },
  )

  onMounted(() => {
    container.value = getTarget(props.target)
    on(container.value, eventType, handleScroll)
    handleScroll()
  })

  onBeforeUnmount(() => {
    off(container.value, eventType, handleScroll)
  })

  return { scrollTo }
}
