/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { proLayoutToken } from '../token'

export default defineComponent({
  name: 'IxProLayoutLogo',
  setup(_, { slots }) {
    const { props, mergedPrefixCls } = inject(proLayoutToken)!

    return () => {
      let logoNode: VNodeChild

      if (slots.logo) {
        logoNode = slots.logo()
      } else if (props.logo) {
        const { image, title, link = '/' } = props.logo
        logoNode = (
          <a href={link}>
            {isString(image) ? <img src={image} alt="logo" /> : image}
            {title && <h1>{title}</h1>}
          </a>
        )
      }
      return <div class={`${mergedPrefixCls.value}-logo`}>{logoNode}</div>
    }
  },
})
