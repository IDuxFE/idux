import { renderWork } from '@tests'
import IxRow from '../src/Row.vue'
import IxCol from '../src/Col.vue'

const componentFactory = (config = {}) =>
  Object.assign(
    {
      components: { IxRow, IxCol },
      template: `
    <ix-row v-bind="rowProps">
      <ix-col v-bind="colProps">1</ix-col>
      <ix-col v-bind="colProps">1</ix-col>
    </ix-row>
  `,
      props: {
        rowProps: {
          type: Object,
          default: () => ({}),
        },
        colProps: {
          type: Object,
          default: () => ({
            span: 12,
          }),
        },
      },
    },
    config,
  )

describe('row.vue & col.vue', () => {
  renderWork(componentFactory())

  // 下面的单测依赖 breakpoint 中断点的有效性, 目前由于断点观测会失败, 所以暂时注释掉(resizeTarget 也无效)

  // gutter 配置对象, 观察 row style 是否成功设置了 margin
  // test('gutter of object type works', async () => {
  //   const rowSelector = '.ix-row'
  //   const colSelector = '.ix-col'
  //   const wrapper = mount(componentFactory(), {
  //     props: {
  //       rowProps: {
  //         gutter: {
  //           xs: 8,
  //           sm: 8,
  //           md: 8,
  //           lg: 8,
  //           xl: 8,
  //         },
  //       },
  //       colProps: {
  //         span: 12,
  //       },
  //     },
  //   })

  //   const rowStyle = wrapper.find(rowSelector).attributes().style

  //   expect(rowStyle).toContain('margin-left: -4px')
  //   expect(rowStyle).toContain('margin-right: -4px')
  // })

  // gutter 配置为数组([number, number]/[Record, Record]), 观察 row style 是否成功设置了 margin

  // resize 不同的浏览器尺寸, 配置了 breakpoint 生效
})
