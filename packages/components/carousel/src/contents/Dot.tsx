/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { carouselToken } from '../token'

export default defineComponent({
  props: { isActive: { type: Boolean, required: true }, index: { type: Number, required: true } },
  setup(props) {
    const { slots, mergedPrefixCls, mergedTrigger, cleanAutoplay, goTo } = inject(carouselToken)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-dot`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-active`]: props.isActive,
      })
    })

    const handleTrigger = () => {
      cleanAutoplay()
      goTo(props.index)
    }

    const events = computed(() => {
      if (mergedTrigger.value === 'click') {
        return { onClick: handleTrigger }
      }
      return { onMouseenter: handleTrigger }
    })

    return () => {
      return (
        <li class={classes.value} {...events.value}>
          {slots.dot ? slots.dot(props) : <button type="button"></button>}
        </li>
      )
    }
  },
})
