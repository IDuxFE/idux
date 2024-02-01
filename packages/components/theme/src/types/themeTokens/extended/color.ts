/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ExtendedColorTokens {
  /**
   * @desc 组件容器背景颜色
   */
  colorContainerBg: string
  /**
   * @desc 组件容器悬浮背景颜色
   */
  colorContainerBgHover: string
  /**
   * @desc 组件容器激活状态背景颜色，用于menu、select、tree-select等
   */
  colorContainerBgActive: string
  /**
   * @desc 组件容器禁用背景颜色
   */
  colorContainerBgDisabled: string
  /**
   * @desc 需要突出显示的容器背景颜色，例如表头
   */
  colorEmphasizedContainerBg: string
  /**
   * @desc 需要突出显示的容器背景颜色，例如表头
   */
  colorEmphasizedContainerBgHover: string
  /**
   * @desc 需要突出显示的容器背景颜色，例如表头
   */
  colorEmphasizedContainerBgDisabled: string
  /**
   * @desc 信息容器背景颜色，用于组件内容承载的容器， 比如fieldset
   */
  colorInfoContainerBg: string
  /**
   * @desc 信息容器悬浮背景颜色，用于组件内容承载的容器， 比如fieldset
   */
  colorInfoContainerBgHover: string
  /**
   * @desc 信息容器禁用背景颜色，用于组件内有信息承载的容器， 比如fieldset
   */
  colorInfoContainerBgDisabled: string
  /**
   * @desc 容器附加元素背景色，例如输入框的 addon
   */
  colorAddonContainerBg: string
  /**
   * @desc 控件组件容器在未选中时的填充颜色
   */
  colorFillContainerBg: string

  /**
   * @desc 分割线颜色
   */
  colorSeparator: string

  /**
   * @desc placeholder 背景颜色
   */
  colorTextPlaceholder: string
  /**
   * @desc 文字禁用颜色
   */
  colorTextDisabled: string
  /**
   * @desc 反向文字颜色，用于有背景颜色的文字
   */
  colorTextInverse: string
  /**
   * @desc 反向文字禁用，用于有背景颜色的文字
   */
  colorTextInverseDisabled: string
  /**
   * @desc 标题颜色
   */
  colorTextTitle: string
  /**
   * @desc 副标题颜色
   */
  colorTextTitleSecondary: string
  /**
   * @desc 信息，描述
   */
  colorTextInfo: string

  /**
   * @desc 图标颜色
   */
  colorIcon: string
  /**
   * @desc 信息图标颜色，这种图标不可操作，仅展示
   */
  colorIconInfo: string
  /**
   * @desc 图标悬浮颜色
   */
  colorIconHover: string
  /**
   * @desc 图标激活颜色
   */
  colorIconActive: string
  /**
   * @desc 图标禁用颜色
   */
  colorIconDisabled: string

  /**
   * @desc 警告状态的组件边框颜色，用于表单控件
   */
  colorWarningOutline: string
  /**
   * @desc 错误状态的组件边框颜色，用于表单控件
   */
  colorErrorOutline: string

  /**
   * @desc 反向背景颜色，用于有背景颜色的容器中，如幽灵按钮
   */
  colorBgInverse: string
  /**
   * @desc 反向禁用背景颜色，用于有背景颜色的容器中，如幽灵按钮
   */
  colorBgInverseDisabled: string

  /**
   * @desc 反向边框颜色，用于由北京的容器中，如幽灵按钮
   */
  colorBorderInverse: string
  /**
   * @desc 次级边框颜色，用于组件内容区域分割
   */
  colorBorderSecondary: string

  /**
   * @desc 遮罩颜色
   */
  colorMask: string

  /**
   * @private Internal usage only
   * @desc IxTag 组件的颜色Alpha值，仅用于这一个组件
   */
  tagCompColorAlpha: number
  /**
   * @private Internal usage only
   * @desc IxAlert 组件的颜色Alpha值， 仅用于这一个组件
   */
  alertCompColorAlpha: number
}
