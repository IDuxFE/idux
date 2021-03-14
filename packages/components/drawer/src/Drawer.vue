<template>
  <div>抽屉内容</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { DrawerProps } from './types'
import { PropTypes } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxDrawer',
  props: {
    visible: PropTypes.bool,
    title: PropTypes.string,
    footer: PropTypes.string,
    closable: PropTypes.bool,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'] as const),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def('30%'),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def('100%'),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def(0),
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    wrapClassName: PropTypes.string,
    destroyOnHide: PropTypes.bool,
    keyboard: PropTypes.bool,
    beforeClose: PropTypes.func,
  },
  setup(props: DrawerProps) {
    // init
    console.log(props)
  },
})
</script>
