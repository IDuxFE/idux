<template>
  <component :is="tag" :target="target" :offset="offsetTop">
    <div class="ix-anchor-wrapper" :style="wrapperStyle">
      <div class="ix-anchor">
        <div class="ix-anchor-ink">
          <span v-show="inkInFixedVisible" :class="inkCls" :style="{ top: `${inkTop}px` }" />
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, watch, ref, nextTick, provide, Ref } from 'vue'
import type { AnchorProps, LinkProps } from './types'
import { anchorPropsDef } from './types'
import { on, off } from '@idux/cdk/utils'
import { getOffsetTop, scrollTo, getCurrentScrollTop } from './util'
import { getTarget } from '@idux/components/utils'
import { IxAffix } from '@idux/components/affix'
import { useGlobalConfig } from '@idux/components/config'
import { anchorToken } from './token'

export default defineComponent({
  name: 'IxAnchor',
  components: { IxAffix },
  props: anchorPropsDef,
  emits: ['change', 'click'],
  setup(props: AnchorProps, { emit }) {
    const eventType = 'scroll'
    const tag = computed(() => (props.affix ? 'ix-affix' : 'div'))
    const container = ref<Window | HTMLElement>((null as unknown) as HTMLElement)

    const anchorConfig = useGlobalConfig('anchor')
    const inkInFixedVisible = computed(() => props.showInkInFixed ?? anchorConfig.showInkInFixed)

    const { activeLink, registerLink, unregisterLink, links, setActiveLink } = useLinks()
    const { inkCls, updateInk, inkTop } = useInk(props, activeLink)

    const elOffsetTop = computed(() => props.targetOffset ?? props.offsetTop ?? 0)
    const animating = ref(false)

    // 滚动到哪里
    const handleScrollTo = (link: string) => {
      setActiveLink(link)
      const target = document.getElementById(link.split('#')[1])
      if (!target) {
        return
      }
      const scrollTop = getCurrentScrollTop(container.value)
      const offsetTop = getOffsetTop(target, container.value)
      const y = scrollTop + offsetTop - elOffsetTop.value
      animating.value = true
      scrollTo(y, {
        container: container.value,
        callback() {
          animating.value = false
          updateInk()
        },
      })
    }

    const handleLinkClick = (evt: MouseEvent, linkProps: LinkProps) => {
      emit('click', evt, linkProps)
    }

    provide(anchorToken, {
      activeLink,
      registerLink,
      unregisterLink,
      handleScrollTo,
      handleLinkClick,
    })

    const initContainer = () => {
      container.value = getTarget(props.target)
    }

    // 鼠标滚动监听
    const handleScroll = () => {
      if (animating.value) {
        return
      }
      const curLink = useCurrentAnchor(links, container.value, elOffsetTop.value)

      if (activeLink.value !== curLink) {
        setActiveLink(curLink)
        updateInk()
        emit('change', curLink)
      }
    }

    function onTargetEvent() {
      on(container.value, eventType, handleScroll)
    }

    //解绑监听页面滚动事件
    function removeTargetEvent() {
      off(container.value, eventType, handleScroll)
    }

    watch(
      () => props.target,
      () => {
        removeTargetEvent()
        initContainer()
        onTargetEvent()
        handleScroll()
      },
    )

    onMounted(() => {
      nextTick(() => {
        initContainer()
        // 监听事件
        onTargetEvent()
        // 先触发一下滚动事件
        handleScroll()
      })
    })

    onUnmounted(() => {
      // 取消监听事件
      removeTargetEvent()
    })

    const wrapperStyle = computed(() => {
      return { maxHeight: props.offsetTop ? `calc(100vh - ${props.offsetTop}px)` : '100vh' }
    })

    return {
      tag,
      inkTop,
      inkCls,
      wrapperStyle,
      inkInFixedVisible,
    }
  },
})

const useLinks = () => {
  const links = ref([]) as Ref<string[]>
  const activeLink = ref('')
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
    activeLink.value = link
  }
  return {
    registerLink,
    unregisterLink,
    links,
    activeLink,
    setActiveLink,
  }
}
const useInk = (props: AnchorProps, link: Ref<string>) => {
  const prefixCls = 'ix-anchor'
  const inkTop = ref(0)
  const updateInk = () => {
    const currentLinkEl = document.querySelector(`a[data-href="${link.value}"]`)
    if (!currentLinkEl) {
      return
    }
    const elTop = (currentLinkEl as HTMLElement).offsetTop
    inkTop.value = (elTop < 0 ? props.offsetTop : elTop) || 0
  }
  const inkCls = computed(() => {
    return [`${prefixCls}-ink-ball`, link.value ? 'visible' : '']
  })
  return {
    inkTop,
    updateInk,
    inkCls,
  }
}

interface Section {
  link: string
  top: number
}

const useCurrentAnchor = (links: Ref<string[]>, container: HTMLElement | Window, offsetTop = 0): string => {
  let maxSection: Section | null = null

  links.value.forEach(link => {
    const target = document.getElementById(link.split('#')[1])
    if (target) {
      const top = getOffsetTop(target, container)
      if (top < offsetTop + 5 && (!maxSection || maxSection.top < top)) {
        maxSection = { link, top }
      }
    }
  })

  return maxSection ? maxSection!.link : ''
}
</script>
