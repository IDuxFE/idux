/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, watch } from 'vue'

import { type VKey, useState } from '@idux/cdk/utils'
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'

import { colorPickerPanelToken } from '../token'
import PresetIndicator from './PresetIndicator'

export default defineComponent({
  name: 'IxColorPickerPresets',
  setup() {
    const { mergedPrefixCls, locale, resolvedPresets } = inject(colorPickerPanelToken)!
    const [expandedKeys, setExpandedKeys] = useState<VKey[]>([])

    const expandeKeySet = computed(() => new Set(expandedKeys.value))

    watch(
      resolvedPresets,
      presets => {
        const newExpandedKeySet = new Set<VKey>()
        presets.forEach(preset => {
          if (preset.defaultOpen || expandeKeySet.value.has(preset.key)) {
            newExpandedKeySet.add(preset.key)
          }
        })

        setExpandedKeys([...newExpandedKeySet])
      },
      {
        immediate: true,
      },
    )

    const renderCollapseHeader = ({
      expanded,
      changeExpand,
      label,
    }: {
      expanded: boolean
      label: string
      changeExpand: () => void
    }) => {
      return (
        <IxHeader
          title={label}
          onClick={changeExpand}
          size="sm"
          v-slots={{
            prefix: () => (
              <IxIcon
                class={`${mergedPrefixCls.value}-presets-collapse-icon`}
                name="right"
                rotate={expanded ? 90 : 0}
              />
            ),
          }}
        />
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-presets`

      return (
        <IxCollapse
          class={prefixCls}
          expandedKeys={expandedKeys.value}
          ghost
          borderless
          onUpdate:expandedKeys={setExpandedKeys}
        >
          {resolvedPresets.value.map(preset => (
            <IxCollapsePanel
              key={preset.key}
              v-slots={{
                header: (params: { expanded: boolean; changeExpand: () => void }) =>
                  renderCollapseHeader({ ...params, label: preset.label }),
              }}
            >
              {preset.colors.length ? (
                <div class={`${mergedPrefixCls.value}-presets-colors`}>
                  {preset.colors.map(color => (
                    <PresetIndicator color={color} />
                  ))}
                </div>
              ) : (
                <span class={`${mergedPrefixCls.value}-empty`}>{locale.presetEmpty}</span>
              )}
            </IxCollapsePanel>
          ))}
        </IxCollapse>
      )
    }
  },
})
