/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { IxButton } from '@idux/components/button'
import { IxIcon } from '@idux/components/icon'
import { useThemeToken } from '@idux/components/theme'

import { layoutSiderToken } from './token'
import { layoutSiderTriggerProps } from './types'

export default defineComponent({
  name: 'IxLayoutSiderTrigger',
  props: layoutSiderTriggerProps,
  setup(props, { slots }) {
    const { mergedPrefixCls, collapsed, setCollapsed } = inject(layoutSiderToken)!
    const { globalHashId, hashId } = useThemeToken('layout')

    const mergedIcon = computed(() => {
      const { icon } = props
      const [fold = 'menu-fold', unfold = 'menu-unfold'] = Array.isArray(icon) ? icon : [icon, icon]
      return collapsed.value ? fold : unfold
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-trigger`
      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      }
    })

    const handleClick = () => {
      setCollapsed(!collapsed.value, 'trigger')
    }

    return () => {
      let iconNode: VNodeChild
      if (slots.icon) {
        iconNode = slots.icon({ collapsed: collapsed.value })
      } else {
        const iconValue = mergedIcon.value
        iconNode = isString(iconValue) ? <IxIcon name={iconValue} /> : iconValue
      }

      return (
        <div class={classes.value}>
          <span>{slots.default?.()}</span>
          <IxButton v-slots={{ icon: () => iconNode }} mode="text" onClick={handleClick} />
        </div>
      )
    }
  },
})
