import IxMessage from '../src/message'
import { h } from 'vue'
import { wait } from '@tests'
import { MessageType } from '../src/types'
import { IxIcon } from '@idux/components/icon'

describe('Message', () => {
  let container: HTMLElement
  const getMessageItems = () => container.querySelectorAll('.ix-message-item')
  const messageTypes: MessageType[] = ['info', 'success', 'warning', 'error', 'loading']

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IxMessage.install({} as any)
    container = document.querySelector('.ix-message-container')!
  })

  beforeEach(() => {
    IxMessage.destroy()
  })

  messageTypes.forEach(type => {
    test(`${type} work`, async () => {
      const content = `This is a ${type} message`
      const open = IxMessage[type]
      open(content)
      await wait(100)

      expect(container.textContent).toContain(content)
      expect(container.querySelector(`.ix-message-item-${type}`)).toBeTruthy()
    })
  })

  test('open work', async () => {
    const content = 'Open message'
    IxMessage.open({ content, type: 'info' })
    await wait(100)

    expect(container.textContent).toContain(content)
  })

  test(`VNode content work`, async () => {
    const content = h('div', { class: 'custom-content' }, 'custom content')
    IxMessage.info(content)
    await wait(200)

    expect(container.textContent).toContain('custom content')
    expect(document.querySelectorAll('.custom-content').length).toBe(1)
  })

  test(`icon work`, async () => {
    const iconName = 'star'
    const iconVNode = h(IxIcon, { name: 'star' })
    IxMessage.info('icon name', { icon: iconName })
    IxMessage.info('icon VNode', { icon: iconVNode })

    await wait(100)

    expect(document.querySelectorAll('.ix-icon-star').length).toBe(2)
  })

  test('destroy work', async () => {
    const instance = IxMessage.info('message')
    await wait(200)

    expect(getMessageItems().length).toBe(1)

    IxMessage.destroy(`not exist id`)
    await wait(100)

    expect(getMessageItems().length).toBe(1)

    IxMessage.destroy(instance.id)
    await wait(100)

    expect(getMessageItems().length).toBe(0)

    IxMessage.info('message1')
    IxMessage.info('message2')
    await wait(100)

    expect(getMessageItems().length).toBe(2)

    IxMessage.destroy()
    await wait(100)

    expect(getMessageItems().length).toBe(0)
  })

  test('instance destroy word', async () => {
    const instance = IxMessage.info('message')
    await wait(100)

    expect(getMessageItems().length).toBe(1)

    instance.destroy()
    await wait(100)

    expect(getMessageItems().length).toBe(0)
  })

  test(`duration work`, async () => {
    IxMessage.success('message', { duration: 1000 })
    await wait(100)

    expect(getMessageItems().length).toBe(1)

    await wait(1000)

    expect(getMessageItems().length).toBe(0)

    IxMessage.success('message', { duration: 0 })

    await wait(100)

    expect(getMessageItems().length).toBe(1)
  })

  test('destroyOnHover work', async () => {
    IxMessage.info('message', { destroyOnHover: true, duration: 200 })
    await wait(100)

    container.querySelector('.ix-message-item')!.dispatchEvent(new MouseEvent('mouseenter'))
    await wait(200)

    expect(getMessageItems().length).toBe(0)

    IxMessage.info('message2', { duration: 200 })
    await wait(100)
    container.querySelector('.ix-message-item')!.dispatchEvent(new MouseEvent('mouseenter'))
    await wait(200)

    expect(getMessageItems().length).toBe(1)

    container.querySelector('.ix-message-item')!.dispatchEvent(new MouseEvent('mouseleave'))
    await wait(250)

    expect(getMessageItems().length).toBe(0)
  })

  test('id work', async () => {
    const id1 = 'id1'
    const id2 = 'id2'
    IxMessage.info(`message1`, { id: id1 })
    IxMessage.info(`message2`, { id: id1 })
    IxMessage.info(`message3`, { id: id2 })

    await wait(100)

    expect(getMessageItems().length).toBe(2)
    expect(container.textContent).not.toContain('message1')
    expect(container.textContent).toContain('message2message3')

    IxMessage.info(`message4`, { id: id2 })
    await wait(100)

    expect(container.textContent).toContain('message4')
  })

  test('onDestroy work', async () => {
    const onDestroy = jest.fn()

    IxMessage.info('message', { onDestroy })

    await wait(3100)

    expect(onDestroy).toBeCalledTimes(1)
  })

  test('maxCount work', async () => {
    new Array(10).fill('message').forEach((content, index) => {
      IxMessage.info(`${content}${index}`)
    })
    await wait(100)

    expect(getMessageItems().length).toBe(5)
  })
})
