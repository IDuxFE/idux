/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type WatermarkType = 'text' | 'image'
export type WatermarkDensityType = 'low' | 'mid' | 'high'
export const watermarkProps = {
  /**
   * 水印类型
   *
   * * `text` : 文本水印，支持多行文本，需传入字符串数组
   * * `image`: 图像水印 为保证图片高清且不被拉伸，需同时传入水印图片的宽高 width 和 height，建议使用2倍或3倍图源
   */
  type: { type: String as PropType<WatermarkType>, default: 'text' },
  /** 水印内容
   * * 多行文本时请以数组形式输入
   */
  content: { type: [String, Array] as PropType<string | string[]>, default: undefined, required: true },
  /** 水印旋转角度 */
  rotate: { type: Number, default: -22 },
  /** 水印`z-index` */
  zIndex: { type: Number, default: 11 },
  /** 水印透明度 */
  opacity: { type: Number, default: 1 },
  /**
   * 水印密度
   * * `low` 默认配置
   * * `mid` 中等密度
   * * `high` 高密度
   */
  density: { type: String as PropType<WatermarkDensityType>, default: 'low' },
  /** 禁用水印 */
  disabled: { type: Boolean, default: false },
  /** 水印宽度 */
  width: { type: Number, default: 120 },
  /** 水印高度 */
  height: { type: Number, default: 64 },
  /** 字体颜色 */
  fontColor: { type: String, default: 'rgba(0,0,0,.15)' },
  /** 字体大小 */
  fontSize: { type: Number, default: 16 },

  /**
   * 可控制字体粗细、字体类别等细节
   *
   * @example
   *  font="oblique normal bold 16px sans-serif"
   * @see https://developer.mozilla.org/docs/Web/CSS/font
   * * 但请注意尽量使用`px`作为字体大小单位，同时fontSize的定义优先级高于font
   */
  font: { type: String, default: '16px sans-serif' },

  /** 前端层面的防水印篡改 */
  strict: { type: Boolean, default: true },

  /**
   * 自定义canvas，用于支持保密的暗水印方案等
   * * 函数将执行在组件canvas绘制结束处
   * * 可通过`ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)`清除组件绘制内容
   */
  renderFn: Function as PropType<(ctx: CanvasRenderingContext2D) => void>,

  /**
   * @private
   */
  /** 水平方向的水印间距 */
  gapHorizontal: { type: Number, default: 212 },
  /** 垂直方向的水印间距 */
  gapVertical: { type: Number, default: 222 },
  /** 多行文本之间的行间距 */
  gapContent: { type: Number, default: 22 },
  /** 左偏移量 默认根据水印间距居中处理*/
  offsetLeft: { type: Number, default: undefined },
  /** 上偏移量 默认根据水印间距居中处理*/
  offsetTop: { type: Number, default: undefined },
} as const

export type WatermarkProps = ExtractInnerPropTypes<typeof watermarkProps>
export type WatermarkPublicProps = ExtractPublicPropTypes<
  Omit<typeof watermarkProps, 'strict' | 'offsetTop' | 'offsetLeft' | 'gapHorizontal' | 'gapContent' | 'gapVertical'>
>
export type WatermarkComponent = DefineComponent<
  Omit<HTMLAttributes, keyof WatermarkPublicProps> & WatermarkPublicProps
>
export type WatermarkInstance = InstanceType<DefineComponent<WatermarkProps>>
