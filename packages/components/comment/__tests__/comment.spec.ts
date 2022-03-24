import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { IxAvatar } from '@idux/components/avatar'
import { IxIcon } from '@idux/components/icon'

import Comment from '../src/Comment'
import { CommentProps } from '../src/types'

describe('Comment', () => {
  const CommentMount = (options?: MountingOptions<Partial<CommentProps>>) => mount(Comment, { ...options })

  renderWork<CommentProps>(Comment, {
    props: {
      content: 'comment content',
    },
  })
  const authorText = 'Han Solo'

  test('author work', async () => {
    const wrapper = CommentMount({ props: { author: authorText } })

    expect(wrapper.find('.ix-comment-content-author-name').text()).toBe(authorText)
  })

  test('author slot work', async () => {
    const wrapper = CommentMount({ slots: { author: () => authorText } })

    expect(wrapper.find('.ix-comment-content-author-name').text()).toBe(authorText)
  })

  const avatarSrc = '/images/avatar/0.png'

  test('avatar string work', async () => {
    const wrapper = CommentMount({ props: { avatar: avatarSrc } })

    expect(wrapper.find('.ix-comment-avatar').exists()).toBe(true)
    expect(wrapper.find('img').element.src).toContain(avatarSrc)
  })

  const squareShape = 'square'
  const circleShape = 'circle'

  test('avatar object work', async () => {
    const wrapper = CommentMount({
      props: {
        avatar: { src: avatarSrc, shape: squareShape },
      },
    })

    expect(wrapper.find('.ix-avatar-square').exists()).toBe(true)
    expect(wrapper.find('img').element.src).toContain(avatarSrc)

    await wrapper.setProps({ avatar: { src: avatarSrc, shape: circleShape } })
    expect(wrapper.find('.ix-avatar-circle').exists()).toBe(true)
    expect(wrapper.find('.ix-avatar-square').exists()).toBe(false)
  })

  test('avatar slot work', async () => {
    const wrapper = CommentMount({
      slots: { avatar: () => [h(IxAvatar, { src: avatarSrc })] },
    })

    expect(wrapper.find('img').element.src).toContain(avatarSrc)
  })

  const commentContent = 'this is comment text !'

  test('content work', async () => {
    const wrapper = CommentMount({
      props: { content: commentContent },
    })

    expect(wrapper.find('.ix-comment-content-detail').text()).toBe(commentContent)
  })

  test('content slot work', async () => {
    const wrapper = CommentMount({
      slots: { content: () => [h('p', commentContent)] },
    })

    expect(wrapper.find('p').text()).toContain(commentContent)
  })

  const datetime1 = '2022/3/24'
  const datetime2 = '2022/3/25'

  test('datetime work', async () => {
    const wrapper = CommentMount({
      props: { datetime: datetime1 },
    })

    expect(wrapper.find('.ix-comment-content-author-time').text()).toBe(datetime1)

    await wrapper.setProps({ datetime: datetime2 })
    expect(wrapper.find('.ix-comment-content-author-time').text()).toBe(datetime2)
  })

  test('default slot work', async () => {
    const wrapper = CommentMount({
      slots: {
        default: () => [
          h(Comment, {
            content: commentContent,
          }),
        ],
      },
    })

    expect(wrapper.find('.ix-comment-nested').text()).toContain(commentContent)
  })

  test('actions slot work', async () => {
    const wrapper = CommentMount({
      slots: {
        actions: () => [
          h(IxIcon, {
            name: 'like',
          }),
        ],
      },
    })

    const action = wrapper.find('.ix-icon-like')
    expect(action.exists()).toBe(true)
  })
})
