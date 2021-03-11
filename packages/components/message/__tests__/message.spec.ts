import { MessageApiFn } from '../src/types'
import { MessageService } from '../index'
import { h } from 'vue'
import { wait } from '@tests'

describe('Message', () => {
  let overlayContainerEL: HTMLElement
  const getOverlayElChildren = () => overlayContainerEL.querySelectorAll('.ix-message-item')
  const typeList = ['success', 'error', 'info', 'warn']
  const animateTime = 200

  beforeAll(() => {
    jest.setTimeout(20000)
    const message = MessageService.success('init')
    MessageService.remove(message.messageId)
    if (!overlayContainerEL) {
      overlayContainerEL = MessageService.getContainer()
    }
  })
  beforeEach(() => {
    MessageService.remove()
  })

  typeList.forEach(type => {
    test(`should open a message with ${type}`, async () => {
      const text = type
      const api = (MessageService as never)[type] as MessageApiFn
      api(text)
      await wait(animateTime)
      expect(overlayContainerEL.textContent).toContain(text)
    })
  })
  test('should open a message with create', async () => {
    const text = 'create'
    MessageService.create({
      content: text,
    })
    await wait(animateTime)
    expect(overlayContainerEL.textContent).toContain(text)
  })

  test('should be able to remove a message', async () => {
    const ins = MessageService.success('success')
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(1)
    await MessageService.remove(ins.messageId)
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(0)
    expect(overlayContainerEL.textContent).toContain('')
  })

  test('should not to remove a message which is not exist', async () => {
    const ins = MessageService.success('success')
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(1)
    await MessageService.remove(`notExist${ins.messageId}`)
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(1)
  })

  test('should be able to remove two messages', async () => {
    const insOne = MessageService.success('success')
    const insTwo = MessageService.success('success')
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(2)
    await MessageService.remove([insOne.messageId, insTwo.messageId])
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(0)
    expect(overlayContainerEL.textContent).toContain('')
  })

  test('should be able to remove all messages', async () => {
    for (let i = 0; i < 5; i++) {
      MessageService.success(`success${i}`)
    }
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(5)
    await MessageService.remove()
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test('should be able to remove message by return function', async () => {
    const ins = MessageService.success('success')
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(1)
    ins.destroy()
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test('should message container create only once', async () => {
    const containerOne = MessageService.getContainer()
    const containerTwo = MessageService.getContainer()
    expect(containerOne).toEqual(containerTwo)
  })

  test(`should be able to custom duration`, async () => {
    MessageService.success({ content: 'success', duration: 7000 })
    await wait(3500)
    expect(getOverlayElChildren().length).toBe(1)
    await wait(4000)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test(`should be able to custom duration other config `, async () => {
    MessageService.success({ content: 'success' }, 2000)
    await wait(1000)
    expect(getOverlayElChildren().length).toBe(1)
    await wait(1500)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test(`should be able to empty content`, async () => {
    MessageService.success(undefined as any)
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(1)
  })

  typeList.forEach(type => {
    test(`should be able to custom ${type} content`, async () => {
      const text = h('div', { class: 'custom-message-content' }, 'custom content')
      const api = (MessageService as never)[type] as MessageApiFn
      api({
        content: text,
      })
      await wait(animateTime)
      expect(overlayContainerEL.textContent).toContain('custom content')
      expect(overlayContainerEL.querySelectorAll('.custom-message-content').length).toBe(1)
    })
  })

  typeList.forEach(type => {
    test(`should be able to custom ${type} icon`, async () => {
      const icon = h('img', { class: 'custom-message-icon' })
      const api = (MessageService as never)[type] as MessageApiFn
      api({
        icon,
        content: type,
      })
      await wait(animateTime)
      expect(overlayContainerEL.querySelectorAll('.custom-message-icon').length).toBe(1)
    })
  })

  test('should have no icon', async () => {
    MessageService.create({ content: 'create', icon: '' })
    await wait(animateTime)
    expect(overlayContainerEL.querySelector('.ix-icon')).toBeNull()
  })

  test('should pauseOnHover option work with true', async () => {
    MessageService.success({ content: 'success', pauseOnHover: true })
    await wait(animateTime)
    const contentEl = overlayContainerEL.querySelector('.ix-message-item')
    const mouseEnterEvent = new MouseEvent('mouseenter')
    if (contentEl) {
      contentEl.dispatchEvent(mouseEnterEvent)
    }
    await wait(3500)
    expect(getOverlayElChildren().length).toBe(1)
    const mouseLeaveEvent = new MouseEvent('mouseleave')
    if (contentEl) {
      contentEl.dispatchEvent(mouseLeaveEvent)
    }
    await wait(3500)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test('should pauseOnHover option work with false', async () => {
    MessageService.success({ content: 'success', pauseOnHover: false })
    await wait(animateTime)
    const contentEl = overlayContainerEL.querySelector('.ix-message-item')
    const mouseEnterEvent = new MouseEvent('mouseenter')
    if (contentEl) {
      contentEl.dispatchEvent(mouseEnterEvent)
    }
    await wait(3500)
    expect(getOverlayElChildren().length).toBe(0)
  })

  test('should messageId option work', async () => {
    const messageIdFirst = 'custom-message-1'
    const messageIdSecond = 'custom-message-2'
    MessageService.success({ content: 'success1', messageId: messageIdFirst })
    MessageService.success({ content: 'success2', messageId: messageIdFirst })
    MessageService.success({ content: 'success3', messageId: messageIdSecond })
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(2)
    expect(overlayContainerEL.textContent).not.toContain('success1')
    expect(overlayContainerEL.textContent).toContain('success2')
    MessageService.success({ content: 'change-content', messageId: messageIdFirst })
    await wait(animateTime)
    expect(overlayContainerEL.textContent).toContain('change-content')
  })

  test('should onClose option work', async () => {
    let onCloseCalled = false
    MessageService.success({
      content: 'success',
      onClose() {
        onCloseCalled = true
      },
    })
    await wait(3500)
    expect(onCloseCalled).toBeTruthy()
  })

  test('should maxCount config work', async () => {
    new Array(10).fill('success').forEach((content, i) => {
      MessageService.success(`${content}${i}`)
    })
    await wait(animateTime)
    expect(getOverlayElChildren().length).toBe(5)
  })
})
