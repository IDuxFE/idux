<template>
  <ix-portal target="body">
    <transition name="ix-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave" @before-leave="beforeLeave">
      <ix-mask v-show="maskVisible" :mask="mask" :mask-class="wrapClassName" @click="onModalClick">
        <div ref="drawerRef" :class="['ix-drawer', placement]" :style="drawerStyle" @click.stop>
          <header v-if="title || slots.title" class="ix-drawer-header">
            <slot v-if="title || slots.title" name="title">
              <span role="heading" :title="title">
                {{ title }}
              </span>
            </slot>
            <button v-if="closable" class="ix-drawer-close-btn" type="button" @click="handleClose">
              <ix-icon class="ix-icon-close" name="close" />
            </button>
          </header>
          <template v-if="rendered">
            <section class="ix-drawer-body">
              <slot></slot>
            </section>
          </template>
          <footer v-if="footer || slots.footer" class="ix-drawer-footer">
            <slot name="footer">
              <span role="footer" :title="footer">
                {{ footer }}
              </span>
            </slot>
          </footer>
        </div>
      </ix-mask>
    </transition>
  </ix-portal>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { SetupContext } from 'vue'
import { DrawerProps } from './types'
import { PropTypes } from '@idux/cdk/utils'
import { IxPortal } from '@idux/cdk/portal'
import { IxIcon } from '@idux/components/icon'
import { IxMask } from '@idux/components/mask'
import useModal from './useModal'

export default defineComponent({
  name: 'IxDrawer',
  components: { IxPortal, IxIcon, IxMask },
  props: {
    visible: PropTypes.bool,
    title: PropTypes.string,
    footer: PropTypes.string,
    closable: PropTypes.bool.def(true),
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'] as const).def('right'),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def(0),
    mask: PropTypes.bool.def(true),
    maskClosable: PropTypes.bool.def(true),
    wrapClassName: PropTypes.string,
    destroyOnHide: PropTypes.bool.def(false),
    keyboard: PropTypes.bool.def(true),
    beforeClose: PropTypes.func,
  },
  emits: ['open', 'opened', 'close', 'closed', 'update:visible'],
  setup(props: DrawerProps, ctx) {
    const drawerRef = ref<HTMLElement>(null)
    const isHorizontal = computed(() => props.placement === 'right' || props.placement === 'left')
    const renderPx = (size?: string | number) => {
      return typeof size === 'number' ? `${size}px` : size
    }
    const drawerStyle = computed(() => {
      const width = props.width || (isHorizontal.value ? '30%' : '100%') // 不传值时水平方向宽度默认30%
      const height = props.height || (isHorizontal.value ? '100%' : '30%') // 不传值时垂直方向高度默认30%
      const renderOffset = renderPx(props.offset)
      const offset = isHorizontal.value ? { top: renderOffset } : { left: renderOffset }
      return {
        width: renderPx(width),
        height: renderPx(height),
        ...offset,
      }
    })
    return {
      ...useModal(props, ctx as SetupContext, drawerRef),
      slots: ctx.slots,
      drawerStyle,
    }
  },
})
</script>
