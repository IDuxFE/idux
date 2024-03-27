/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { toString } from 'lodash-es'

import { IxAlert } from '@idux/components/alert'
import { useGlobalConfig } from '@idux/components/config'

import TagSelectCreationOption from './TagSelectCreationOption'
import TagSelectOption from './TagSelectOption'
import { proTagSelectContext } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const common = useGlobalConfig('common')
    const {
      locale,
      mergedPrefixCls,
      filteredData,
      dataMaxExceeded,
      selectedValue,
      inputValue,
      inputFullyMatched,
      setEditPanelOpened,
    } = inject(proTagSelectContext)!

    const showEmpty = computed(() => !filteredData.value.length && (!inputValue.value || dataMaxExceeded.value))
    const showCreatOption = computed(() => inputValue.value && !inputFullyMatched.value && !dataMaxExceeded.value)

    const handleMousedown = (evt: MouseEvent) => {
      setEditPanelOpened(false)

      if (!(evt.target instanceof HTMLInputElement)) {
        evt.preventDefault()
      }
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-panel`

      return (
        <div class={[prefixCls, `${common.prefixCls}-scroll-min`]} onMousedown={handleMousedown}>
          {dataMaxExceeded.value && (
            <div class={`${prefixCls}-alert`}>
              {slots.maxExceededAlert?.() ?? (
                <IxAlert icon="info-circle">
                  {locale.maxExceededAlert.replace('${0}', toString(selectedValue.value?.length ?? 0))}
                </IxAlert>
              )}
            </div>
          )}
          {filteredData.value.map(data => (
            <TagSelectOption data={data} v-slots={slots} />
          ))}
          {showEmpty.value && <div class={`${prefixCls}-empty`}>{locale.empty}</div>}
          {showCreatOption.value && <TagSelectCreationOption />}
        </div>
      )
    }
  },
})
