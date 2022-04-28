/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { zhCN } from '@idux/components/locales'

import { numFormatter } from './numFormatter'
import { type GlobalConfig } from './types'

export const defaultConfig: GlobalConfig = {
  common: {
    prefixCls: 'ix',
  },
  locale: zhCN,

  alert: {
    closable: false,
    icon: {
      success: 'check-circle',
      error: 'info-circle',
      info: 'bulb',
      warning: 'exclamation-circle',
    },
  },
  anchor: {
    bounds: 5,
    hideLinkBall: false,
  },
  avatar: {
    gap: 4,
    icon: 'user',
    shape: 'circle',
    size: 'md',
  },
  backTop: {
    duration: 450,
    visibilityHeight: 400,
  },
  badge: {
    showZero: false,
    dot: false,
    overflowCount: 99,
  },
  button: {
    size: 'md',
  },
  card: {
    borderless: false,
    hoverable: false,
    size: 'md',
  },
  carousel: {
    autoplayTime: 0,
    dotPlacement: 'bottom',
    showArrow: false,
    trigger: 'click',
  },
  cascader: {
    borderless: false,
    clearIcon: 'close-circle',
    childrenKey: 'children',
    expandIcon: 'right',
    fullPath: true,
    getKey: 'key',
    labelKey: 'label',
    overlayMatchWidth: false,
    size: 'md',
    suffix: 'down',
  },
  checkbox: {
    size: 'md',
  },
  collapse: {
    accordion: false,
    borderless: false,
    expandIcon: 'right',
    ghost: false,
  },
  datePicker: {
    allowInput: false,
    borderless: false,
    clearable: false,
    clearIcon: 'close-circle',
    size: 'md',
    suffix: 'calendar',
  },
  divider: {
    dashed: false,
    labelPlacement: 'center',
    plain: false,
    size: 'md',
  },
  drawer: {
    closable: true,
    closeOnEsc: true,
    closeIcon: 'close',
    height: 256,
    mask: true,
    maskClosable: true,
    width: 480,
  },
  dropdown: {
    autoAdjust: true,
    destroyOnHide: false,
    offset: [0, 8],
    placement: 'bottomStart',
    showArrow: false,
    trigger: 'hover',
  },
  empty: {
    icon: 'empty',
  },
  form: {
    colonless: false,
    labelAlign: 'end',
    layout: 'horizontal',
    size: 'md',
    labelTooltipIcon: 'question-circle',
    controlTooltipIcon: 'info-circle',
  },
  icon: {},
  input: {
    borderless: false,
    clearable: false,
    clearIcon: 'close-circle',
    size: 'md',
  },
  inputNumber: {
    keyboard: true,
    size: 'md',
  },
  list: {
    size: 'md',
    borderless: true,
  },
  image: {
    preview: true,
  },
  imageViewer: {
    loop: true,
    maskClosable: true,
    zoom: [0.5, 2],
  },
  menu: {
    indent: 24,
    offset: [0, 8],
    suffix: 'right',
    theme: 'light',
  },
  message: {
    destroyOnHover: false,
    duration: 3000,
    maxCount: 5,
    icon: {
      success: 'check-circle-filled',
      error: 'close-circle-filled',
      info: 'info-circle-filled',
      warning: 'exclamation-circle-filled',
      loading: 'loading',
    },
  },
  modal: {
    centered: false,
    closable: true,
    closeIcon: 'close',
    closeOnEsc: true,
    mask: true,
    maskClosable: true,
    width: 520,
  },
  notification: {
    destroyOnHover: false,
    duration: 4500,
    maxCount: 5,
    offset: 24,
    placement: 'topEnd',
  },
  pagination: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: false,
    showSizeChanger: false,
    showTitle: true,
    showTotal: true,
    simple: false,
    size: 'md',
  },
  popconfirm: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: 'top',
    trigger: 'click',
  },
  popover: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: 'top',
    showArrow: true,
    trigger: 'hover',
    closeIcon: 'close',
  },
  progress: {
    strokeLinecap: 'round',
    size: 'md',
    format: (percent: number) => percent + '%',
  },
  radio: {
    size: 'md',
  },
  rate: {
    allowHalf: false,
    clearable: false,
    count: 5,
    icon: 'star-filled',
    size: 'md',
  },
  result: {
    status: 'info',
  },
  row: {
    wrap: true,
  },
  select: {
    borderless: false,
    childrenKey: 'children',
    getKey: 'key',
    clearIcon: 'close-circle',
    labelKey: 'label',
    overlayMatchWidth: true,
    size: 'md',
    suffix: 'down',
  },
  skeleton: {
    animated: true,
  },
  space: {
    size: 'md',
    wrap: true,
  },
  spin: {
    tip: '',
    tipAlign: 'vertical',
    size: 'md',
  },
  statistic: {
    precision: 0,
    formatter: numFormatter,
  },
  stepper: {
    clickable: false,
    labelPlacement: 'end',
    size: 'md',
  },
  switch: {
    size: 'md',
  },
  table: {
    autoHeight: false,
    borderless: true,
    childrenKey: 'children',
    getKey: 'key',
    size: 'md',
    extra: {
      icon: 'ellipsis',
    },
    pagination: {
      position: 'bottomEnd',
    },
    columnBase: {
      align: 'start',
      sortable: {
        nextTooltip: false,
        orders: ['ascend', 'descend'],
      },
      filterable: {
        multiple: true,
        footer: true,
      },
    },
    columnExpandable: {
      icon: 'right',
    },
  },
  tag: {},
  tagGroup: {
    gap: 8,
    wrap: true,
  },
  textarea: {
    autoRows: false,
    clearable: false,
    clearIcon: 'close-circle',
    resize: 'vertical',
    showCount: false,
    size: 'md',
  },
  timePicker: {
    borderless: false,
    clearable: true,
    clearIcon: 'close-circle',
    size: 'md',
    suffix: 'clock-circle',
    allowInput: false,
    format: 'HH:mm:ss',
  },
  timeRangePicker: {
    borderless: false,
    clearable: true,
    clearIcon: 'close-circle',
    size: 'md',
    suffix: 'clock-circle',
    allowInput: false,
    format: 'HH:mm:ss',
  },
  transfer: {
    getKey: 'key',
    clearable: true,
    clearIcon: 'clear',
    showSelectAll: true,
  },
  tooltip: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: 'top',
    trigger: 'hover',
  },
  tree: {
    blocked: false,
    expandIcon: 'right',
    nodeKey: 'key',
    showLine: false,
  },
  treeSelect: {
    borderless: false,
    childrenKey: 'children',
    clearIcon: 'close-circle',
    labelKey: 'label',
    nodeKey: 'key',
    overlayMatchWidth: true,
    size: 'md',
    suffix: 'down',
  },
  upload: {
    multiple: false,
    dragable: false,
    directory: false,
    name: 'file',
    withCredentials: false,
    requestMethod: 'post',
  },
  uploadFiles: {
    type: 'text',
    icon: {
      file: 'paper-clip',
      remove: 'delete',
      retry: 'edit',
    },
  },
}
