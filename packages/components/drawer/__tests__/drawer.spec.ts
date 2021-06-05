import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import { defineComponent, nextTick } from 'vue'
import IxDrawer from '../src/Drawer.vue'
import { DrawerProps } from '../src/types'

const TestComponent = defineComponent({
  components: { IxDrawer },
  // eslint-disable-next-line vue/require-prop-types
  props: [
    'visible',
    'title',
    'footer',
    'closable',
    'placement',
    'width',
    'height',
    'offset',
    'mask',
    'maskClosable',
    'wrapClassName',
    'destroyOnHide',
    'keyboard',
    'beforeClose',
  ],
  template: `
  <ix-drawer v-model:visible="visible" :title="title" :footer="footer" :closable="closable" :placement="placement"
             :width="width" :height="height" :offset="offset" :mask="mask" :mask-closable="maskClosable"
             :wrap-class-name="wrapClassName" :destroy-on-hide="destroyOnHide" :keyboard="keyboard" :before-close="beforeClose">
    <template v-if='!!$slots.title' #title><slot name='title'/></template>
    <p>抽屉内容</p>
    <template v-if="!!$slots.footer" #footer><slot name="footer"/></template>
  </ix-drawer>
  `,
})

describe('Drawer.vue', () => {
  let DrawerMount: (options?: MountingOptions<DrawerProps>) => VueWrapper<InstanceType<typeof TestComponent>>

  let maskContainer: HTMLElement
  let drawerContainer: HTMLElement

  const getDrawerContainer = async (): HTMLElement => {
    await nextTick()
    return document.body.querySelector('.ix-drawer')!
  }
  const getMaskContainer = async (): HTMLElement => {
    await nextTick()
    return document.body.querySelector('.ix-mask')!
  }

  const drawerTitle = 'drawer title'

  beforeEach(() => {
    DrawerMount = options => mount(TestComponent, { ...options })
  })

  afterEach(() => {
    document.body.querySelectorAll('.ix-mask').forEach(value => {
      value.remove()
    })
  })

  test('visible work', async () => {
    const wrapper = DrawerMount({ props: { visible: false, title: drawerTitle } })
    maskContainer = await getMaskContainer()
    expect(maskContainer.style.display).toEqual('none')
    await wrapper.setProps({ visible: true })
    maskContainer = await getMaskContainer()
    expect(maskContainer.style.display).toEqual('')
  })

  renderWork(IxDrawer, { props: { visible: true, title: drawerTitle } })

  test('title slot work', async () => {
    const titleProps = 'title props'
    const titleSlot = 'title slots'
    DrawerMount({
      props: { title: titleProps, visible: true },
      slots: { title: titleSlot },
    })
    drawerContainer = await getDrawerContainer()

    expect((drawerContainer.querySelector('.ix-drawer-header') as HTMLDivElement).textContent).toEqual(titleSlot)
  })

  test('footer slot work', async () => {
    const footerProps = 'footer props'
    const footerSlot = 'footer slots'
    DrawerMount({
      props: { footer: footerProps, visible: true },
      slots: { footer: footerSlot },
    })
    drawerContainer = await getDrawerContainer()

    expect((drawerContainer.querySelector('.ix-drawer-footer') as HTMLDivElement).textContent).toEqual(footerSlot)
  })

  test('closable work', async () => {
    const wrapper = DrawerMount({ props: { title: drawerTitle, closable: false } })
    drawerContainer = await getDrawerContainer()
    expect(drawerContainer.querySelector('.ix-drawer-close-btn')).toBeNull()

    await wrapper.setProps({ closable: true })
    drawerContainer = await getDrawerContainer()
    expect(drawerContainer.querySelector('.ix-drawer-close-btn')).not.toBeNull()
  })

  test('placement work', async () => {
    const wrapper = DrawerMount()
    drawerContainer = await getDrawerContainer()
    expect(drawerContainer.className).toEqual('ix-drawer right') // default right

    const placementArr = ['top', 'right', 'bottom', 'left']
    placementArr.forEach(async item => {
      await wrapper.setProps({ placement: item })
      drawerContainer = await getDrawerContainer()
      expect(drawerContainer.className).toEqual(`ix-drawer ${item}`)
    })
  })

  test('width and height work', async () => {
    const width = '50%'
    const height = 600
    DrawerMount({
      props: { width, height },
    })
    drawerContainer = await getDrawerContainer()

    expect(drawerContainer.style.width).toEqual(width)
    expect(drawerContainer.style.height).toEqual(`${height}px`)
  })

  test('offset work', async () => {
    const wrapper = DrawerMount({
      props: { placement: 'right', offset: 50 },
    })
    drawerContainer = await getDrawerContainer()
    expect(drawerContainer.style.left).toEqual('')
    expect(drawerContainer.style.top).toEqual('50px')

    await wrapper.setProps({ placement: 'top', offset: 100 })
    drawerContainer = await getDrawerContainer()
    expect(drawerContainer.style.left).toEqual('100px')
    expect(drawerContainer.style.top).toEqual('')
  })

  test('mask work', async () => {
    const wrapper = DrawerMount({ props: { title: drawerTitle, mask: false } })
    maskContainer = await getMaskContainer()
    expect(maskContainer.className).toEqual(`ix-mask`)

    await wrapper.setProps({ mask: true })
    maskContainer = await getMaskContainer()
    expect(maskContainer.className).toEqual(`ix-mask has-mask`)
  })

  test('maskClosable work', async () => {
    const wrapper = DrawerMount({ props: { visible: true, title: drawerTitle, maskClosable: false } })
    maskContainer = await getMaskContainer()
    await maskContainer.click()
    expect(maskContainer.style.display).toEqual('')

    await wrapper.setProps({ maskClosable: true })
    maskContainer = await getMaskContainer()
    await maskContainer.click()
    expect(maskContainer.style.display).toEqual('none')
  })

  test('wrapClassName work', async () => {
    const testClassName = 'testClass'
    DrawerMount({ props: { wrapClassName: testClassName } })
    await nextTick()
    expect(document.body.querySelector(`.${testClassName}`)).not.toBeNull()
  })

  // test('destroyOnHide work', async () => {
  //   DrawerMount({ props: { visible: true, destroyOnHide: true } })
  //   maskContainer = await getMaskContainer()
  //   await maskContainer.click();
  //   maskContainer = await getMaskContainer()

  //   console.log(maskContainer.style.display)
  //   console.log(document.body.querySelector(`.ix-drawer-body`))
  //   expect(document.body.querySelector(`.ix-drawer-body`)).toBeNull()
  // })

  // test('keyboard work', async () => {
  //   const wrapper = DrawerMount({ props: { visible: true, keyboard: false } })
  //   maskContainer = await getMaskContainer()
  //   await document.body.trigger('keydown')
  //   maskContainer = await getMaskContainer()
  //   expect(maskContainer.style.display).toEqual('')

  //   await wrapper.setProps({ maskClosable: true })
  //   maskContainer = await getMaskContainer()
  //   await maskContainer.click();
  //   maskContainer = await getMaskContainer()
  //   expect(maskContainer.style.display).toEqual('none')
  // })

  test('beforeClose work', async () => {
    const beforeClose = jest.fn()
    DrawerMount({ props: { visible: true, beforeClose } })
    maskContainer = await getMaskContainer()
    await maskContainer.click()

    expect(beforeClose).toHaveBeenCalled()
  })
})
