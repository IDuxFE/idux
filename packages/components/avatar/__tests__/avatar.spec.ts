import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'

import { createFakeEvent, renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'

import Avatar from '../src/Avatar'
import { AvatarProps } from '../src/types'

const imageBase64 =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1OCAoODQ2NjMpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjEyODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSI5OS42Mjc4NTA1JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDBBQ0ZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzY2RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0yIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzFEQjgzRiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNzJEMTNEIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IjEyOCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTQ0LjQ2NzMxMjYsNjIuMjMyMTcwNSBMNzAuMTI5ODAxNSw4My43NjU1NTU0IEM2MC4xODk3NTEyLDk1LjYxMTY0NiA0Mi41Mjg1OTQ2LDk3LjE1Njc5NyAzMC42ODI1MDQsODcuMjE2NzQ2NyBMMjguMjQ4MTQ5Miw4NS4xNzM4OTc1IEMyMS4zMTIxMTA4LDc5LjMwODkyOTQgMTQuMzM1NDQzOSw3My40NTQ4NzE4IDcuMzE4MTQ4NDYsNjcuNjExNzI0NiBMOS4yNDY1MTEyOSw2NS4zMTM1OTEzIEMxMy44NDgzODY0LDU5LjgyOTI5MDEgMjAuMzAzNzUwNyw1Ni44MTc3Nzk2IDI2LjkyNzcxNzYsNTYuNDI2NDY4MyBMMjguMzQ5MTA1Nyw1Ni4zODI2OTk1IEMzNC4wNDAwNjg2LDU2LjM2ODg1MDQgMzkuNzY2NDgzLDU4LjI4NzcwNjEgNDQuNDY3MzEyNiw2Mi4yMzIxNzA1IFoiIGlkPSLot6/lvoQiIGZpbGw9IiMyMDRFRDkiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNOTUuNDM4MDk4NCw0NS4xMzQ1MDkgTDk3LjMzMTY2NTYsNDUuMjI3OTkzMiBMOTguNzAxMDU1OSw0NS4zNjI3MDcyIEwxMDAuNTE2MTI5LDQ1LjYyOTI5MTYgTDEwMS44OTEyODcsNDUuODk5NDE2NCBMMTAzLjQzNjU4NSw0Ni4yNzUwNzE5IEwxMDUuMTY5NDEsNDYuNzkwNDA1MSBMMTA2LjU4NzY2NSw0Ny4yODk1OTM3IEwxMDguMjEyNTY1LDQ3Ljk1MjAwNzQgTDEwOC45MzE3Niw0OC4yNzc2NDAxIEwxMDguOTMxNzYsNDguMjc3NjQwMSBMMTEwLjM1Mzg5OCw0OC45ODM2MzEgTDExMS44MDUxMjgsNDkuNzk0NjA0NSBMMTEzLjQ0MzE5OSw1MC44MzAxOTgxIEwxMTQuNjUzNDk2LDUxLjY4NTY5MTIgTDExNS44MjE1MjEsNTIuNTkyMTI3NSBMMTE3LjE4ODUzNyw1My43NjU3NjYgTDExOC40NzMyOTksNTQuOTk1MDg2NCBMMTE5LjUzMzEzLDU2LjExNTU4MDYgTDEyMC4wODg2Miw1Ni43NDY0NjgzIEwxMjAuMDg4NjIsNTYuNzQ2NDY4MyBMMTIxLjIwODAwMyw1OC4xMjIyMDA1IEwxMjIuMTMwNDY5LDU5LjM3NzQ1NiBMNzIuMjk3NDUzMyw5NC4yNzA5MDkyIEM2Ny41NzI1ODc4LDk3LjU3OTI5NTcgNjIuMTMzNTU1NCw5OS4zMTAyNzggNTYuNjY4NDkzMSw5OS40OTg0MDA0IEw1NS4wMjg4ODE3LDk5LjUwODU4NTggQzQ4LjQ3MjgxNzUsOTkuMzY0NDYwNyA0MS45NzgzNjIyLDk3LjAwMzU5MTYgMzYuNzM0NjE2NSw5Mi40ODU2NzA5IEwzMi43NjgwODE2LDg5LjAzMzg2MiBMMzIuNzY4MDgxNiw4OS4wMzM4NjIgTDI3LjYzNjUwMzksODQuNjQ2ODk0IEw3NS42Mzg0ODQ5LDUxLjE0MzQ2MzQgQzc3LjQ1OTY4NTEsNDkuODcyMzM5NyA3OS4zNjM0NjM3LDQ4LjgwNzg1NjQgODEuMzIxOTc2Miw0Ny45NDUwODIgTDgzLjI5NzM3NzksNDcuMTQ5NDc5OSBDODQuMzIzMzMxMSw0Ni43NzQwNzgyIDg1LjM2MTE5MzEsNDYuNDUxNzgxNSA4Ni40MDcyNTc2LDQ2LjE4MTg4MTUgTDg3Ljk4MjA0MzEsNDUuODE2MjQwMyBMODkuNjQ0MTg2Niw0NS41MTY1NyBMOTEuMzg1OTMwMyw0NS4yOTQ4NTUxIEw5My4wNTA0MjI4LDQ1LjE2OTM0MjMgQzkzLjg0NjY4MzIsNDUuMTI5Mjc1NyA5NC42NDMxMDY0LDQ1LjExNzc1ODggOTUuNDM4MDk4NCw0NS4xMzQ1MDkgWiIgaWQ9Iui3r+W+hCIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik01MS4zODg4NTIsMzIuNDY5NDc1OSBMNjMuNjQ1NTYzMSw0Mi43NTQwNzc2IEM1OC42NzU1MzgsNDguNjc3MTIyOSA0OS44NDQ5NTk3LDQ5LjQ0OTY5ODQgNDMuOTIxOTE0NCw0NC40Nzk2NzMzIEwzMi44MTQyNywzNS4xNTkyNTMgTDMzLjc3ODQ1MTQsMzQuMDEwMTg2MyBDMzguMjE1OTczOCwyOC43MjE3NTMgNDYuMTAwNDE4NywyOC4wMzE5NTM0IDUxLjM4ODg1MiwzMi40Njk0NzU5IFoiIGlkPSLot6/lvoQiIGZpbGw9IiMwMzc4MkEiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNNzIuMDY0NTA2MiwyNi4xMjg0NDA2IEw3My4yNjYzMDc5LDI2LjIyMjA0MTMgTDc0LjM3NzU0MTYsMjYuMzk3MDkgTDc1LjU3NjI3OTIsMjYuNjg0OTIyNCBMNzYuNDc4NTYyMywyNi45NzMxMDM2IEw3Ny41MTY0NTg5LDI3LjM4NjMzNDcgTDc3LjUxNjQ1ODksMjcuMzg2MzM0NyBMNzguMjAwNjU1MywyNy43MTA0NDczIEw3OS4zMDc1MTExLDI4LjMzMTQwODYgTDc5LjcwNDIsMjguNTg1OTgwNSBMODAuMjkxNTU3OCwyOC45OTc0NTY2IEw4MC44MDkzMjg3LDI5LjM5NzU4MjggTDgxLjIxODA3NjgsMjkuNzQwODE0MyBMODEuNzcyNzI0MywzMC4yNDk2ODA3IEw4Mi4yMTE2Mzk2LDMwLjY5MTk2MzIgTDgyLjIxMTYzOTYsMzAuNjkxOTYzMiBMODIuNjM0NzgxOCwzMS4xNTYxOTk0IEw4My4wOTIyMjcyLDMxLjcwNjIzMjEgTDgzLjYxOTAyNjMsMzIuNDEzNDQ1NSBMNjMuMTYzMzEwOCw0Ni43MzY2OTE3IEM2MC45ODg3ODEsNDguMjU5MzEzOSA1OC41MTE3ODE3LDQ5LjExMzY3NjggNTYuMDAwNjA2Myw0OS4zMTMzMzE2IEw1NC43NDM0MTI4LDQ5LjM1ODY2MjggQzUxLjM4OTkyNjQsNDkuMzM0Mzg5NyA0OC4wNTUxNzcxLDQ4LjE1MDIwNjEgNDUuMzc1MTE5NSw0NS44MzgyMzM0IEw0Mi4zNzc0OTk1LDQzLjI1MjMxMyBMNjMuMDcwNjgxNiwyOC43ODMyMDI2IEM2My42NzAxMjExLDI4LjM2NDA2MTggNjQuMjg5ODcxMywyNy45OTU2NDMzIDY0LjkyNDgzNTYsMjcuNjc3MDQ2OCBMNjUuOTUxNDUxMywyNy4yMTAyOTkxIEw2NS45NTE0NTEzLDI3LjIxMDI5OTEgTDY2LjU3MDYwOTYsMjYuOTczMjE1NyBMNjcuNzY3NzYyNywyNi42MDI1NDE2IEw2Ny43Njc3NjI3LDI2LjYwMjU0MTYgTDY4Ljk4MjU5NjQsMjYuMzM3MjA5MiBMNjkuNzk2ODcyMSwyNi4yMTg1ODE3IEw3MC4yMTY0MDg1LDI2LjE3NTQ3ODUgQzcwLjgzMjMzODgsMjYuMTIxMDkyMyA3MS40NDk2MzQ3LDI2LjEwNTYzNjEgNzIuMDY0NTA2MiwyNi4xMjg0NDA2IFoiIGlkPSLot6/lvoQiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+'

const getScaleStyle = (style: string) => {
  return +/(\w+)\(([^)]*)\)/g.exec(style)![2]
}

describe('Avatar', () => {
  const AvatarMount = (options?: MountingOptions<Partial<AvatarProps>>) =>
    mount(Avatar, { ...(options as MountingOptions<AvatarProps>) })

  renderWork<AvatarProps>(Avatar)

  describe('image', () => {
    test('src work', async () => {
      const wrapper = AvatarMount({ props: { src: imageBase64 } })
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('alt work', async () => {
      const wrapper = AvatarMount({ props: { src: imageBase64 } })
      expect(wrapper.find('img').element.alt).toBe('')

      const alt = 'alt work'
      await wrapper.setProps({ alt })

      expect(wrapper.find('img').element.alt).toBe(alt)
    })

    test('srcset work', async () => {
      const wrapper = AvatarMount({ props: { src: imageBase64 } })
      expect(wrapper.find('img').element.srcset).toBe('')

      const srcset = 'srcset.svg'
      await wrapper.setProps({ srcset })

      expect(wrapper.find('img').element.srcset).toBe(srcset)
    })

    test('error work', async () => {
      const wrapper = AvatarMount({ props: { src: imageBase64 } })
      const src = 'https://error.svg'
      const onError = jest.fn()
      await wrapper.setProps({ src, onError })
      const event = createFakeEvent('error')
      await wrapper.vm.handleError(event)

      expect(onError).toBeCalledWith(event)

      // default fallback icon
      expect(wrapper.find('.ix-icon-user').exists()).toBe(true)

      //  fallback text
      const text = 'fallback text'
      await wrapper.setProps({ text })
      await wrapper.vm.handleError(event)

      expect(wrapper.find('.ix-avatar-text').text()).toBe(text)
    })
  })

  describe('text', () => {
    test('text work', async () => {
      let text = 'text'
      const wrapper = AvatarMount({ props: { text } })
      expect(wrapper.find('.ix-avatar-text').text()).toBe(text)

      text = 'text2'

      await wrapper.setProps({ text })

      expect(wrapper.find('.ix-avatar-text').text()).toBe(text)
    })

    test('text slot work', async () => {
      const text = 'text'
      const textSlot = 'text slot'
      const wrapper = AvatarMount({ props: { text }, slots: { default: () => textSlot } })
      expect(wrapper.find('.ix-avatar-text').text()).toBe(textSlot)
    })

    test('short text work', async () => {
      const text = 'U'

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
        return this.className === 'ix-avatar-text' ? 10 : 40
      })

      const wrapper = AvatarMount({ props: { text } })
      await flushPromises()

      expect(getScaleStyle(wrapper.find('.ix-avatar-text')!.attributes('style'))).toBe(1)

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockClear()
    })

    test('long text work', async () => {
      const text = 'LongUsername'

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
        return this.className === 'ix-avatar-text' ? 80 : 40
      })

      const wrapper = AvatarMount({ props: { text } })
      await flushPromises()

      expect(getScaleStyle(wrapper.find('.ix-avatar-text')!.attributes('style'))).toBeLessThan(1)

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockClear()
    })

    test('gap work', async () => {
      const text = 'LongUsername'

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
        return this.className === 'ix-avatar-text' ? 80 : 40
      })

      const wrapper = AvatarMount({ props: { text } })
      await flushPromises()

      const defaultScale = getScaleStyle(wrapper.find('.ix-avatar-text')!.attributes('style'))

      await wrapper.setProps({ gap: 8 })
      await flushPromises()

      expect(getScaleStyle(wrapper.find('.ix-avatar-text')!.attributes('style'))).toBeLessThan(defaultScale)

      await wrapper.setProps({ gap: 2 })
      await flushPromises()

      expect(getScaleStyle(wrapper.find('.ix-avatar-text')!.attributes('style'))).toBeGreaterThan(defaultScale)

      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockClear()
    })
  })

  test('icon work', async () => {
    const wrapper = AvatarMount()
    expect(wrapper.find('.ix-icon-user').exists()).toBe(true)

    await wrapper.setProps({ icon: 'up' })

    expect(wrapper.find('.ix-icon-up').exists()).toBe(true)

    await wrapper.setProps({ icon: h(IxIcon, { name: 'down' }) })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
  })

  test('icon slot work', async () => {
    const wrapper = AvatarMount({
      props: { icon: 'up' },
      slots: { icon: () => h(IxIcon, { name: 'down' }) },
    })

    expect(wrapper.find('.ix-icon-down').exists()).toBe(true)
  })

  test('shape work', async () => {
    const wrapper = AvatarMount()
    expect(wrapper.classes()).toContain('ix-avatar-circle')

    await wrapper.setProps({ shape: 'square' })

    expect(wrapper.classes()).toContain('ix-avatar-square')
  })

  test('size work', async () => {
    const wrapper = AvatarMount()
    expect(wrapper.classes()).toContain('ix-avatar-md')

    await wrapper.setProps({ size: 'lg' })

    expect(wrapper.classes()).toContain('ix-avatar-lg')

    await wrapper.setProps({ size: 'sm' })

    expect(wrapper.classes()).toContain('ix-avatar-sm')

    await wrapper.setProps({ size: 64 })

    expect(wrapper.attributes('style')).toContain('width: 64px; height: 64px; line-height: 64px; font-size: 32px;')
  })
})
