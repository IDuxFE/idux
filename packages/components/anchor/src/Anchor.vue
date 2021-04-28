<template>
  <component :is="tag" :target="target" :offset="offsetTop">
    <div class="ix-anchor-wrapper" :style="wrapperStyle">
      <div class="ix-anchor">
        <div class="ix-anchor-ink">
          <span v-show="showInkInFixed" :class="inkCls" :style="{ top: `${inkTop}px` }" />
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
  ref,
  nextTick,
  provide,
  Ref,
  SetupContext,
} from 'vue'
import { AnchorProps, Section } from './types'
import { PropTypes, on, off, isNil } from '@idux/cdk/utils'
import { getOffsetTop, scrollTo, getCurrentScrollTop, anchorToken } from './util'
import { getTarget } from '@idux/components/utils'
import { IxAffix } from '@idux/components/affix'
import { useGlobalConfig } from '@idux/components/config'
export default defineComponent({
  name: 'IxAnchor',
  components: { IxAffix },
  props: {
    affix: PropTypes.bool.def(true), //固定模式, false为不浮动，状态不随页面滚动变化,默认true
    showInkInFixed: PropTypes.bool, //固定模式是否显示小圆点
    target: PropTypes.oneOfType([PropTypes.string, HTMLElement, Window]), //指定滚动的元素
    offsetTop: PropTypes.number, //距离窗口顶部达到指定偏移量后触发
    targetOffset: PropTypes.number, //锚点滚动偏移量，默认与 offsetTop 相同
  },
  emits: ['change', 'click'],
  setup(props: AnchorProps, context: SetupContext) {
    const eventType = 'scroll'
    const tag = computed(() => (props.affix ? 'ix-affix' : 'div'))
    const container = ref<Window | HTMLElement>((null as unknown) as HTMLElement)

    const anchorConfig = useGlobalConfig('anchor');
    const inkInFixedVisble = props.showInkInFixed ?? anchorConfig.showInkInFixed;

    const { activeLink, registerLink, unregisterLink, links, setActiveLink } = useLinks()
    const { inkCls, updateInk, inkTop } = useInk(props, activeLink)

    const elOffsetTop = computed(() => (!isNil(props.targetOffset) ? props.targetOffset : props.offsetTop || 0))
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

    provide(anchorToken, {
      activeLink,
      registerLink,
      unregisterLink,
      handleScrollTo,
      context
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
        context.emit('change', curLink)
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
      inkInFixedVisble
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
const useCurrentAnchor = (links: Ref<string[]>, cotainer: HTMLElement | Window, offsetTop = 0): string => {
  let maxSection: Section | null = null
  links.value.forEach(link => {
    const target = document.getElementById(link.split('#')[1])
    if (target) {
      const top = getOffsetTop(target, cotainer)
      if (top < offsetTop + 5) {
        const cur = { link, top }
        maxSection = maxSection ? (maxSection!.top < top ? cur : maxSection) : cur
      }
    }
  })
  return maxSection ? maxSection!.link : ''
}
</script>
