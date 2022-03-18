/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, normalizeStyle } from 'vue'

import { isBoolean, isNil, isObject } from 'lodash-es'

import { convertCssPixel } from '@idux/cdk/utils'
import { IxSpin, type SpinProps } from '@idux/components/spin'

import { transferContext } from '../token'
import { transferListProps } from '../types'
import TransferListBody from './TransferListBody'
import TransferListFooter from './TransferListFooter'
import TransferListHeader from './TransferListHeader'

export default defineComponent({
  props: transferListProps,
  setup(props) {
    const { props: transferProps, mergedPrefixCls } = inject(transferContext)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-list`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.isSource ? 'source' : 'target'}`]: true,
        [`${prefixCls}-virtual`]: transferProps.virtual && transferProps.scroll,
        [`${prefixCls}-disabled`]: transferProps.disabled,
      })
    })

    const style = computed(() => {
      const scrollWidth = transferProps.scroll?.width
      let width: string | number | undefined
      if (isObject(scrollWidth)) {
        width = props.isSource ? scrollWidth.source : scrollWidth.target
      } else {
        width = scrollWidth
      }

      if (!width) {
        return
      }

      return normalizeStyle({
        width: convertCssPixel(width),
      })
    })

    const spinProps = computed<SpinProps | undefined>(() => {
      if (isNil(transferProps.spin)) {
        return
      }

      if (isBoolean(transferProps.spin)) {
        return { spinning: !!transferProps.spin }
      }

      return { spinning: props.isSource ? transferProps.spin.source : transferProps.spin.target }
    })

    return () => {
      const children = [
        <TransferListHeader isSource={props.isSource} />,
        <TransferListBody isSource={props.isSource} />,
        <TransferListFooter isSource={props.isSource} />,
      ]
      return (
        <div class={classes.value} style={style.value}>
          {spinProps.value ? <IxSpin {...spinProps.value}>{children}</IxSpin> : children}
        </div>
      )
    }
  },
})
