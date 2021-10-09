/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IxMenuDivider',
  setup() {
    return () => <li class="ix-menu-divider"></li>
  },
})
