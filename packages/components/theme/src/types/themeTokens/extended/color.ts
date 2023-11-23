/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ExtendedColorTokens {
  colorContainerBg: string // 组件容器背景颜色
  colorContainerBgHover: string //组件容器悬浮背景颜色
  colorContainerBgActive: string // 组件容器激活状态背景颜色，用于menu、select、tree-select等
  colorContainerBgDisabled: string // 组件容器禁用背景颜色
  colorEmphasizedContainerBg: string // 需要突出显示的容器背景颜色，例如表头
  colorEmphasizedContainerBgHover: string // 需要突出显示的容器背景颜色，例如表头
  colorEmphasizedContainerBgDisabled: string // 需要突出显示的容器背景颜色，例如表头
  colorInfoContainerBg: string // 信息容器背景颜色，用于组件内有信息承载的容器， 比如fieldset
  colorInfoContainerBgHover: string // 信息容器悬浮背景颜色，用于组件内有信息承载的容器， 比如fieldset
  colorInfoContainerBgDisabled: string // 信息容器禁用背景颜色，用于组件内有信息承载的容器， 比如fieldset
  colorAddonContainerBg: string // 容器附加元素背景色，例如输入框的 addon
  colorFillContainerBg: string // 控件组件容器在未选中时的填充颜色

  colorSeparator: string // 分割线颜色

  colorTextPlaceholder: string // placeholder 背景颜色
  colorTextDisabled: string // 文字禁用颜色
  colorTextInverse: string // 反向文字颜色，用于有背景颜色的文字
  colorTextInverseDisabled: string // 反向文字禁用，用于有背景颜色的文字
  colorTextTitle: string // 标题颜色
  colorTextTitleSecondary: string // 副标题颜色
  colorTextInfo: string // 信息，描述

  colorIcon: string // 图标颜色
  colorIconInfo: string // 信息图标颜色，这种图标不可操作，仅展示
  colorIconHover: string // 图标悬浮颜色
  colorIconActive: string // 图标激活颜色
  colorIconDisabled: string // 图标禁用颜色

  colorWarningOutline: string // 警告状态的组件边框颜色，用于表单控件
  colorErrorOutline: string // 错误状态的组件边框颜色，用于表单控件

  colorBgDisabled: string // 禁用背景颜色
  colorBgInverse: string // 反向背景颜色，用于有背景颜色的容器中，如幽灵按钮
  colorBgInverseDisabled: string // 反向禁用背景颜色，用于有背景颜色的容器中，如幽灵按钮

  colorBorderInverse: string // 反向边框颜色，用于由北京的容器中，如幽灵按钮
  colorBorderSecondary: string // 次级边框颜色，用于组件内容区域分割

  colorMask: string // 遮罩颜色

  tagCompColorAlpha: number // IxTag 组件的颜色Alpha值，仅用于这一个组件
  alertCompColorAlpha: number // IxAlert 组件的颜色Alpha值， 仅用于这一个组件
}
