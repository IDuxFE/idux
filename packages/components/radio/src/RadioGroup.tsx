/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type VNodeChild,
  computed,
  defineComponent,
  normalizeClass,
  onMounted,
  onUpdated,
  provide,
  shallowRef,
} from 'vue'

import { isNil } from 'lodash-es'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { IxSpace } from '@idux/components/space'

import Radio from './Radio'
import { radioGroupToken } from './token'
import { radioGroupProps } from './types'

export default defineComponent({
  name: 'IxRadioGroup',
  inheritAttrs: false,
  props: radioGroupProps,
  setup(props, { attrs, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`)
    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)
    provide(radioGroupToken, { props, accessor })

    const mergedGap = computed(() => {
      return props.gap ?? (props.buttoned ? 0 : 8)
    })

    const elementRef = shallowRef<HTMLDivElement>()
    const calcArrowOffset = () => {
      const element = elementRef.value
      if (!element) {
        return
      }
      const checkedCls = `.${common.prefixCls}-radio-checked`
      const checkedRadio = element.querySelector(checkedCls) as HTMLDivElement | null
      if (checkedRadio) {
        console.log(checkedRadio.offsetLeft)
        element.style.setProperty('--ix-radio-group-fieldset-arrow-offset', `${checkedRadio.offsetLeft}px`)
      }
    }
    onMounted(() => calcArrowOffset())
    onUpdated(() => calcArrowOffset())

    const classes = computed(() => {
      const { buttoned } = props
      const gap = mergedGap.value
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${common.prefixCls}-button-group`]: buttoned,
        [`${common.prefixCls}-button-group-compact`]: buttoned && (!gap || gap === '0'),
      })
    })

    return () => {
      const { dataSource } = props
      const prefixCls = mergedPrefixCls.value
      const { class: className, style, ...restAttrs } = attrs
      let children: VNodeChild[] | undefined
      if (dataSource) {
        children = dataSource.map(item => {
          // TODO: remove value
          const { key, value } = item
          return <Radio {...item} key={key ?? value} value={value ?? key} />
        })
      } else {
        children = slots.default ? slots.default() : undefined
      }
      const radioGroupNode = (
        <IxSpace
          class={slots.fieldset ? classes.value : normalizeClass([classes.value, className])}
          style={slots.fieldset ? undefined : (style as string)}
          size={mergedGap.value}
          {...restAttrs}
        >
          {children}
        </IxSpace>
      )
      if (slots.fieldset) {
        const value = accessor.value
        return (
          <div ref={elementRef} class={`${prefixCls}-wrapper`} style={style as string}>
            {radioGroupNode}
            <div class={normalizeClass([`${prefixCls}-fieldset`, isNil(value) ? `${prefixCls}-fieldset-hidden` : ''])}>
              {slots.fieldset({ value })}
            </div>
          </div>
        )
      }
      return radioGroupNode
    }
  },
})
