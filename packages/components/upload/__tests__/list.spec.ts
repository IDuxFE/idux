import type { UploadFilesProps } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'

import { flushPromises, mount } from '@vue/test-utils'
import { h, ref } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '@idux/components/icon'
import { zhCN } from '@idux/components/locales'

import UploadFilesCpm from '../src/List'
import { uploadToken } from '../src/token'

const uploadFilesMount = (options?: MountingOptions<Partial<UploadFilesProps>>) => {
  const { global: { provide: { [uploadToken as unknown as string]: provideObj } = {}, ...restGlobal } = {}, ...rest } =
    options as MountingOptions<UploadFilesProps>

  return mount(UploadFilesCpm, {
    global: {
      provide: {
        [uploadToken as symbol]: {
          props: {},
          locale: zhCN,
          files: { value: [] },
          setSelectorVisible: () => {},
          ...provideObj,
        },
      },
      ...restGlobal,
    },
    ...rest,
  })
}

describe('Upload list render', () => {
  renderWork<UploadFilesProps>(UploadFilesCpm, {
    global: { provide: { [uploadToken as symbol]: { props: {}, files: { value: [] }, setSelectorVisible: () => {} } } },
  })

  test('type work', async () => {
    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref([
              {
                key: 'test1',
                name: 'idux.svg',
                thumbUrl: '/icons/logo.svg',
              },
            ]),
          },
        },
      },
    })
    await flushPromises()

    expect(wrapper.classes()).toContain('ix-upload-list-text')

    await wrapper.setProps({ type: 'image' })

    expect(wrapper.classes()).toContain('ix-upload-list-image')

    await wrapper.setProps({ type: 'imageCard' })

    expect(wrapper.classes()).toContain('ix-upload-list-imageCard')
  })

  test('icon work', async () => {
    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref([
              {
                key: 'test1',
                name: 'idux.svg',
                errorTip: 'error',
                status: 'error',
              },
            ]),
          },
        },
      },
    })
    await flushPromises()

    expect(wrapper.find('.ix-icon-paper-clip').exists()).toBeTruthy()
    expect(wrapper.find('.ix-icon-delete').exists()).toBeTruthy()
    expect(wrapper.find('.ix-icon-edit').exists()).toBeTruthy()

    const wrapperFileSuccess = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref([
              {
                key: 'test1',
                name: 'idux.svg',
                status: 'success',
              },
            ]),
          },
        },
      },
      props: {
        icon: {
          download: 'download',
          remove: h(IxIcon, { name: 'close' }),
          file: 'left',
        },
      },
    } as MountingOptions<Partial<UploadFilesProps>>)
    await flushPromises()

    expect(wrapperFileSuccess.find('.ix-icon-download').exists()).toBeTruthy()
    expect(wrapperFileSuccess.find('.ix-icon-left').exists()).toBeTruthy()
    expect(wrapperFileSuccess.find('.ix-icon-close').exists()).toBeTruthy()
  })

  test('onDownload work', async () => {
    const onDownload = jest.fn()
    const defaultFiles = [
      {
        key: 'test1',
        name: 'idux.svg',
        status: 'success',
      },
    ]

    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref(defaultFiles),
          },
        },
      },
      props: {
        icon: {
          download: 'download',
        },
        onDownload,
      },
    } as MountingOptions<Partial<UploadFilesProps>>)

    await wrapper.find('.ix-upload-icon-download').trigger('click')

    expect(onDownload).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
  })

  test('onPreview work', async () => {
    const onPreview = jest.fn()
    const defaultFiles = [
      {
        key: 'test1',
        name: 'idux.svg',
        status: 'success',
      },
    ]

    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref(defaultFiles),
          },
        },
      },
      props: {
        icon: {
          preview: 'zoom-in',
        },
        onPreview,
      },
    } as MountingOptions<Partial<UploadFilesProps>>)

    await wrapper.find('.ix-upload-name').trigger('click')

    expect(onPreview).toBeCalledWith(expect.objectContaining(defaultFiles[0]))

    await wrapper.setProps({ type: 'imageCard' })
    await wrapper.find('.ix-icon-zoom-in').trigger('click')

    expect(onPreview).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
  })

  test('onRetry work', async () => {
    const onRetry = jest.fn()
    const upload = jest.fn()
    const defaultFiles = [
      {
        key: 'test1',
        name: 'idux.svg',
        status: 'error',
      },
    ]

    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref(defaultFiles),
            upload,
          },
        },
      },
      props: {
        icon: {
          retry: 'edit',
        },
        onRetry,
      },
    } as MountingOptions<Partial<UploadFilesProps>>)
    await wrapper.find('.ix-upload-icon-retry').trigger('click')

    expect(upload).toBeCalled()
    expect(onRetry).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
  })

  test('onRemove work', async () => {
    const onRemove = jest.fn(() => false)
    const onUpdateFiles = jest.fn()
    const abort = jest.fn()
    const defaultFiles = [
      {
        key: 'test1',
        name: 'idux.png',
        status: 'uploading',
        raw: new File(['test1'], 'idux.png', { type: 'image/png' }),
      },
    ]

    const wrapper = uploadFilesMount({
      global: {
        provide: {
          [uploadToken as symbol]: {
            files: ref(defaultFiles),
            onUpdateFiles,
            abort,
          },
        },
      },
      props: {
        onRemove,
      },
    } as MountingOptions<Partial<UploadFilesProps>>)
    await wrapper.find('.ix-upload-icon-remove').trigger('click')

    expect(onRemove).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
    expect(onUpdateFiles).not.toBeCalled()
    onUpdateFiles.mockRestore()

    const allowRemove = jest.fn(() => true)
    await wrapper.setProps({ onRemove: allowRemove })
    await wrapper.find('.ix-upload-icon-remove').trigger('click')

    expect(allowRemove).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
    expect(abort).toBeCalled()
    expect(onUpdateFiles).toBeCalled()
    onUpdateFiles.mockRestore()

    const allowRemovePromise = jest.fn(() => Promise.resolve(true))
    await wrapper.setProps({ onRemove: allowRemovePromise })
    await wrapper.find('.ix-upload-icon-remove').trigger('click')

    expect(allowRemovePromise).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
    expect(onUpdateFiles).toBeCalled()
    expect(abort).toBeCalled()
    onUpdateFiles.mockRestore()

    const notAllowRemovePromise = jest.fn(() => Promise.resolve(false))
    await wrapper.setProps({ onRemove: notAllowRemovePromise })
    await wrapper.find('.ix-upload-icon-remove').trigger('click')

    expect(notAllowRemovePromise).toBeCalledWith(expect.objectContaining(defaultFiles[0]))
    expect(onUpdateFiles).not.toBeCalled()
  })
})
