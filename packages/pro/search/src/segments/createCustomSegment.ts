/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CustomSegmentConfig, ExtendedSegment, InnerSegmentTypes, PanelRenderContext, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { VNodeChild } from 'vue'

import { isFunction, isString } from 'lodash-es'

import { createCascaderSegment } from './CreateCascaderSegment'
import { createDatePickerSegment } from './CreateDatePickerSegment'
import { createDateRangePickerSegment } from './CreateDateRangePickerSegment'
import { createSelectSegment } from './CreateSelectSegment'
import { createTreeSelectSegment } from './CreateTreeSelectSegment'
import { createInputSegment } from './createInputSegment'

export function createCustomSegment(prefixCls: string, dateConfig: DateConfig, config: CustomSegmentConfig): Segment {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let extendedSegment: Segment<any> | undefined
  if ('extends' in config) {
    extendedSegment = createExtendedSegment(prefixCls, dateConfig, config.extends, config.config)
  }

  const { name, visible, parse, format, customPanel, placeholder } = config

  const panelRenderer = getPanelRenderer(customPanel) ?? extendedSegment?.panelRenderer

  /* eslint-disable indent */
  return {
    name: name ?? 'custom',
    inputClassName: [`${prefixCls}-custom-segment-input`, ...(extendedSegment?.inputClassName ?? [])],
    containerClassName: [`${prefixCls}-custom-segment-container`, ...(extendedSegment?.containerClassName ?? [])],
    placeholder: placeholder ?? extendedSegment?.placeholder,
    visible,
    parse: (parse ?? extendedSegment?.parse)!,
    format: (format ?? extendedSegment?.format)!,
    panelRenderer,
  }
  /* eslint-enable indent */
}

function createExtendedSegment(
  prefixCls: string,
  dateConfig: DateConfig,
  type: InnerSegmentTypes,
  config: ExtendedSegment['config'],
) {
  switch (type) {
    case 'select':
      return createSelectSegment(prefixCls, config as (ExtendedSegment & { extends: 'selectdd' })['config'])
    case 'treeSelect':
      return createTreeSelectSegment(prefixCls, config as (ExtendedSegment & { extends: 'treeSelect' })['config'])
    case 'cascader':
      return createCascaderSegment(prefixCls, config as (ExtendedSegment & { extends: 'cascader' })['config'])
    case 'input':
      return createInputSegment(prefixCls, config as (ExtendedSegment & { extends: 'input' })['config'])
    case 'datePicker':
      return createDatePickerSegment(
        prefixCls,
        config as (ExtendedSegment & { extends: 'datePicker' })['config'],
        dateConfig,
      )
    case 'dateRangePicker':
      return createDateRangePickerSegment(
        prefixCls,
        config as (ExtendedSegment & { extends: 'dateRangePicker' })['config'],
        dateConfig,
      )
    default:
      return
  }
}

function getPanelRenderer(
  customPanel: CustomSegmentConfig['customPanel'],
): ((context: PanelRenderContext) => VNodeChild) | undefined {
  if (isFunction(customPanel)) {
    return (context: PanelRenderContext) => customPanel(context)
  }

  if (isString(customPanel)) {
    return (context: PanelRenderContext) => context.slots[customPanel]?.(context)
  }

  return
}
