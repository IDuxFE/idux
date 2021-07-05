import type { ComputedRef, Ref } from 'vue'
import type { AnchorProps } from './types'

import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { scrollToTop } from '@idux/cdk/scroll'
import { getOffset, off, on } from '@idux/cdk/utils'
import { getTarget } from '@idux/components/utils'

export interface UseLinks {
  links: Ref<string[]>
  activeLink: Ref<string | undefined>
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  setActiveLink: (link: string) => void
}

export const useLinks = (emit: (event: 'change' | 'click', ...args: unknown[]) => void): UseLinks => {
  const links = ref<string[]>([])
  const activeLink = ref<string>()

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

  const setActiveLink = (link: string) => {
    if (activeLink.value !== link) {
      activeLink.value = link
      emit('change', link)
    }
  }

  return {
    links,
    activeLink,
    registerLink,
    unregisterLink,
    setActiveLink,
  }
}

export interface UseLnkBall {
  inkBallClasses: ComputedRef<Record<string, boolean>>
  inkBallTop: Ref<string | undefined>
}

export const useInkBall = (
  anchorRef: Ref<HTMLDivElement | undefined>,
  activeLink: Ref<string | undefined>,
): UseLnkBall => {
  const inkBallClasses = computed(() => {
    return {
      'ix-anchor-ink-ball': true,
      'ix-anchor-ink-ball-visible': !!activeLink.value,
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
  links: Ref<string[]>,
  container: HTMLElement | Window,
  offsetTop: number,
  bounds: number,
): string => {
  let maxSection: { link: string; top: number } | null = null

  links.value.forEach(link => {
    const top = getTargetTop(link, container)
    if (top !== null) {
      if (top < offsetTop + bounds && (!maxSection || maxSection.top < top)) {
        maxSection = { link, top }
      }
    }
  })

  return maxSection ? maxSection!.link : ''
}

export const useScroll = (
  props: AnchorProps,
  links: Ref<string[]>,
  bounds: ComputedRef<number>,
  setActiveLink: (link: string) => void,
): { scrollTo: (link: string) => void } => {
  const container = ref<Window | HTMLElement>()
  const eventType = 'scroll'
  let animating = false

  const targetOffset = computed(() => props.targetOffset ?? props.offsetTop ?? 0)

  // 鼠标滚动监听
  const handleScroll = () => {
    if (animating) {
      return
    }
    const currLink = getCurrentAnchor(links, container.value!, targetOffset.value, bounds.value)
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
