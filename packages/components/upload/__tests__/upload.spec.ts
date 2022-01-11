import type { UploadFile } from '../src/types'
import type { MountingOptions } from '@vue/test-utils'
import type { Ref } from 'vue'

import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { h, ref } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'
import { IxProgress } from '@idux/components/progress'

import UploadFilesListCpm from '../src/List'
import UploadCpm from '../src/Upload'
import { UploadProps } from '../src/types'

const defaultFiles: UploadFile[] = [
  {
    uid: 'test1',
    name: 'idux.svg',
    thumbUrl: '/icons/logo.svg',
  },
  {
    uid: 'error',
    name: 'error.png',
    status: 'error',
    errorTip: 'Upload failed.',
    thumbUrl: '/icons/comp-properties-1.png',
  },
]

const getTestFiles = (count = 1) =>
  new Array(count).fill({}).map((item, index) => new File([`${index}`], `test${index}.png`, { type: 'image/png' }))

// mock input
const triggerInput = async (inputDom: DOMWrapper<HTMLInputElement>, files: File[]) => {
  Object.defineProperty(inputDom.element, 'files', {
    configurable: true,
    writable: true,
    value: files,
  })
  return await inputDom.trigger('change')
}

const uploadMount = (options?: MountingOptions<Partial<UploadProps>>) => {
  const action = '/upload'
  const files: Ref<UploadFile[]> = ref([])
  const { props = {}, slots = {}, ...rest } = options || {}
  const wrapper = mount(UploadCpm, {
    ...rest,
    props: { action, files: files.value, 'onUpdate:files': onUpdateFiles, ...props },
    slots: { list: UploadFilesListCpm, default: h('a', { id: 'upload-test-btn' }), ...slots },
  } as unknown as MountingOptions<UploadProps>)

  function onUpdateFiles(val: UploadFile[]) {
    wrapper.setProps({ files: val })
  }

  return wrapper
}

describe('Upload render', () => {
  let xhrMock: Partial<XMLHttpRequest> = {}

  beforeEach(() => {
    xhrMock = {
      abort: jest.fn(),
      send: jest.fn(),
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      withCredentials: false,
    }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest)
  })

  renderWork<UploadProps>(UploadCpm, { props: { action: '/upload', files: [] } })

  test('slots work', async () => {
    const wrapper = uploadMount({
      slots: {
        default: h(IxButton, { id: 'upload-test-trigger' }),
        list: h(
          'div',
          { id: 'upload-test-list' },
          defaultFiles.map(file => h('a', { class: 'upload-list-file' }, file.name)),
        ),
        tip: h('p', { id: 'upload-test-tip' }, 'Tip test'),
      },
    })
    await flushPromises()

    expect(wrapper.find('#upload-test-trigger').exists()).toBe(true)
    expect(wrapper.findAll('.upload-list-file').length).toBe(2)
    expect(wrapper.find('#upload-test-tip').text()).toBe('Tip test')
  })

  test('v-model:files work', async () => {
    const onUpdateFiles = jest.fn()
    const wrapper = uploadMount({
      props: { files: defaultFiles, 'onUpdate:files': onUpdateFiles },
    })
    await flushPromises()

    expect(wrapper.findAll('.ix-upload-file').length).toBe(2)

    await wrapper.setProps({ files: [{ uid: 'files test', name: 'files test' }] })

    expect(wrapper.findAll('.ix-upload-file').length).toBe(1)

    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(onUpdateFiles).toBeCalled()
  })

  test('accept work', async () => {
    const accept = '.png, image/jpeg'
    const wrapper = uploadMount({ props: { accept } })
    await flushPromises()

    expect(wrapper.find('.ix-upload-input').element.getAttribute('accept')).toBe(accept)

    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(wrapper.findAll('.ix-upload-file').length).toBe(1) // +1

    await triggerInput(wrapper.find('.ix-upload-input'), [new File(['test'], 'test.jpeg', { type: 'image/jpeg' })])

    expect(wrapper.findAll('.ix-upload-file').length).toBe(2) // +1

    await triggerInput(wrapper.find('.ix-upload-input'), [new File(['test'], 'test.svg', { type: 'image/svg+xml' })])

    expect(wrapper.findAll('.ix-upload-file').length).toBe(2) // illegal
  })

  test('directory work', async () => {
    const wrapper = uploadMount({})
    await flushPromises()

    expect(wrapper.find('.ix-upload-input').element.getAttribute('directory')).toBeFalsy()

    await wrapper.setProps({ directory: true })

    expect(wrapper.find('.ix-upload-input').element.getAttribute('directory')).toBe('directory')
  })

  test('disabled work', async () => {
    const wrapper = uploadMount({})
    await flushPromises()

    expect(wrapper.find('.ix-upload-selector-disabled').exists()).toBeFalsy()

    await wrapper.setProps({ disabled: true })

    expect(wrapper.find('.ix-upload-selector-disabled').exists()).toBeTruthy()
  })

  test('multiple work', async () => {
    const wrapper = uploadMount({})
    await flushPromises()

    expect(wrapper.find('.ix-upload-input').html()).not.toContain('multiple')

    await wrapper.setProps({ multiple: true })

    expect(wrapper.find('.ix-upload-input').html()).toContain('multiple')
  })

  test('maxCount work', async () => {
    const wrapper = uploadMount({ props: { multiple: true, maxCount: 1 } })
    await flushPromises()

    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles(2))

    expect(wrapper.findAll('.ix-upload-file').length).toBe(1)

    await wrapper.setProps({ maxCount: 2 })
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles(3))
    expect(wrapper.findAll('.ix-upload-file').length).toBe(2)

    await wrapper.setProps({ maxCount: 0 })
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles(2))
    expect(wrapper.findAll('.ix-upload-file').length).toBe(4) // 2 + 2
  })

  test('dragable work', async () => {
    const wrapper = uploadMount({ props: { dragable: true } })
    await flushPromises()

    const selectorCpm = wrapper.find('.ix-upload-selector-drag')

    expect(selectorCpm.exists()).toBeTruthy()

    await selectorCpm.trigger('dragover')

    expect(selectorCpm.classes()).toContain('ix-upload-selector-dragover')

    await selectorCpm.trigger('dragleave')

    expect(selectorCpm.classes()).not.toContain('ix-upload-selector-dragover')

    await selectorCpm.trigger('drop', { dataTransfer: { files: getTestFiles() } })

    expect(wrapper.findAll('.ix-upload-file').length).toBe(1)
  })

  test('progress work', async () => {
    const wrapper = uploadMount({
      props: {
        files: [
          {
            uid: 'test2',
            name: 'idux.svg',
            status: 'uploading',
            percent: 50,
          },
        ],
      },
    })
    await flushPromises()

    expect(wrapper.findComponent(IxProgress).props()).toMatchObject(expect.objectContaining({ strokeColor: '#20CC94' }))

    await wrapper.setProps({ progress: { strokeColor: { '0%': '#108ee9', '100%': '#87d068' }, strokeWidth: 3 } })

    expect(wrapper.findComponent(IxProgress).props()).toMatchObject(
      expect.objectContaining({
        strokeColor: { '0%': '#108ee9', '100%': '#87d068' },
        strokeWidth: 3,
      }),
    )
  })
})

describe('Upload request', () => {
  let xhrMock: Partial<XMLHttpRequest> = {}

  beforeEach(() => {
    xhrMock = {
      abort: jest.fn(),
      send: jest.fn(),
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      withCredentials: false,
    }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest)
  })

  test('action & requestMethod work', async () => {
    const wrapper = uploadMount({
      props: { action: () => Promise.resolve(`/upload/image`) },
    })
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())
    await flushPromises()

    expect(xhrMock.open).toBeCalledWith('post', '/upload/image', true)

    await wrapper.setProps({ action: '/upload/static', requestMethod: 'put' })
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(xhrMock.open).toBeCalledWith('put', '/upload/static', true)
  })

  test('name work', async () => {
    let requestParams: FormData | null = null
    xhrMock.send = jest.fn((val: FormData) => (requestParams = val))

    const wrapper = uploadMount({})
    await flushPromises()

    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(xhrMock.open).toBeCalled()
    expect(xhrMock.send).toBeCalled()
    expect(requestParams!.has('file')).toBe(true)

    await wrapper.setProps({ name: 'testName' })
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(requestParams!.has('file')).toBe(false)
    expect(requestParams!.has('testName')).toBe(true)
  })

  test('customRequest work', async () => {
    const customRequest = jest.fn()
    const wrapper = uploadMount({ props: { customRequest: customRequest } })
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(xhrMock.open).not.toBeCalled()
    expect(customRequest).toBeCalled()
  })

  test('withCredentials work', async () => {
    const wrapper = uploadMount({})
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(xhrMock.withCredentials).toBe(false)

    await wrapper.setProps({ withCredentials: true })
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(xhrMock.withCredentials).toBe(true)
  })

  test('requestData work', async () => {
    let resultParams: FormData | null = null
    xhrMock.send = jest.fn((val: FormData) => (resultParams = val))
    const requestData = { testField: Math.random().toString(36).slice(-6) }
    const wrapper = uploadMount({ props: { requestData } })
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(resultParams!.get('testField')).toBe(requestData.testField)
  })

  test('requestHeaders work', async () => {
    const resultHeaders: Record<string, string> = {}
    xhrMock.setRequestHeader = jest.fn((name: string, val: string) => (resultHeaders[name] = val))
    const requestHeaders = { testHeader: Math.random().toString(36).slice(-6) }
    const wrapper = uploadMount({ props: { requestHeaders } })
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), getTestFiles())

    expect(resultHeaders!.testHeader).toBe(requestHeaders.testHeader)
  })
})

describe('Upload hooks', () => {
  let xhrMock: Partial<XMLHttpRequest> = {}

  beforeEach(() => {
    xhrMock = {
      abort: jest.fn(),
      send: jest.fn(),
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      withCredentials: false,
    }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest)
  })

  test('onSelect work', async () => {
    const onSelectNotAllow = jest.fn(() => false)
    const wrapper = uploadMount({ props: { onSelect: onSelectNotAllow } })
    const fileNotAllowSelect = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileNotAllowSelect)

    expect(onSelectNotAllow).toBeCalledWith(fileNotAllowSelect)
    expect(wrapper.findAll('.ix-upload-file').length).toBe(0)

    const onSelectAllow = jest.fn(() => true)
    await wrapper.setProps({ onSelect: onSelectAllow })
    const fileAllowSelect = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileAllowSelect)

    expect(onSelectAllow).toBeCalledWith(fileAllowSelect)
    expect(wrapper.findAll('.ix-upload-file').length).toBe(1)

    const onSelectFileTransform = jest.fn((files: File[]) =>
      files.map(file => Object.assign(file, { transformKey: 'test' })),
    )
    await wrapper.setProps({ onSelect: onSelectFileTransform })
    const fileSelected = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileSelected)

    expect(onSelectFileTransform).toBeCalledWith(
      expect.arrayContaining(fileSelected.map(() => expect.objectContaining({ transformKey: 'test' }))),
    )
    expect(wrapper.findAll('.ix-upload-file').length).toBe(2)
  })

  test('onBeforeUpload work', async () => {
    const onBeforeUploadNotAllow = jest.fn(() => false)
    const wrapper = uploadMount({ props: { onBeforeUpload: onBeforeUploadNotAllow } })
    const fileNotAllowUpload = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileNotAllowUpload)

    expect(onBeforeUploadNotAllow).toBeCalledWith(expect.objectContaining({ raw: fileNotAllowUpload[0] }))
    // Adding to the file list is allowed, but uploading requests are not allowed
    expect(wrapper.findAll('.ix-upload-file').length).toBe(1)
    expect(xhrMock.open).not.toBeCalled()
    ;(xhrMock.open as jest.Mock).mockRestore()

    const onBeforeUploadAllow = jest.fn(() => true)
    await wrapper.setProps({ onBeforeUpload: onBeforeUploadAllow })
    const fileAllowUpload = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileAllowUpload)

    expect(onBeforeUploadAllow).toBeCalledWith(expect.objectContaining({ raw: fileAllowUpload[0] }))
    expect(wrapper.findAll('.ix-upload-file').length).toBe(2)
    expect(xhrMock.open).toBeCalled()
    ;(xhrMock.open as jest.Mock).mockRestore()

    const onBeforeUploadFileTransform = jest.fn((file: UploadFile) => file)
    await wrapper.setProps({ onBeforeUpload: onBeforeUploadFileTransform })
    const fileUpload = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileUpload)

    expect(onBeforeUploadFileTransform).toBeCalledWith(expect.objectContaining({ raw: fileUpload[0] }))
    expect(wrapper.findAll('.ix-upload-file').length).toBe(3)
    expect(xhrMock.open).toBeCalled()

    const onBeforeUploadFilePromise = jest.fn(() => Promise.resolve(true))
    await wrapper.setProps({ onBeforeUpload: onBeforeUploadFilePromise })
    const fileUploadPromise = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileUploadPromise)

    expect(onBeforeUploadFilePromise).toBeCalledWith(expect.objectContaining({ raw: fileUploadPromise[0] }))
    expect(wrapper.findAll('.ix-upload-file').length).toBe(4)
    expect(xhrMock.open).toBeCalled()
  })

  test('onFileStatusChange work', async () => {
    let hasStatus = false
    const onFileStatusChange = jest.fn(
      (file: UploadFile) => (hasStatus = ['selected', 'uploading', 'error', 'success', 'abort'].includes(file.status!)),
    )
    const wrapper = uploadMount({ props: { onFileStatusChange } })
    const fileSelect = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileSelect)

    expect(onFileStatusChange).toBeCalled()
    expect(hasStatus).toBe(true)
  })

  test('onRequestChange work', async () => {
    const onRequestChange = jest.fn()
    const wrapper = uploadMount({ props: { onRequestChange } })
    const fileSelect = getTestFiles()
    await flushPromises()
    await triggerInput(wrapper.find('.ix-upload-input'), fileSelect)

    expect(onRequestChange).toBeCalledWith(expect.objectContaining({ status: 'loadstart' }))

    xhrMock.onload?.call(xhrMock as XMLHttpRequest, null as unknown as ProgressEvent)

    expect(onRequestChange).toBeCalledWith(expect.objectContaining({ status: 'loadend' }))

    Reflect.set(xhrMock, 'status', 400)
    await triggerInput(wrapper.find('.ix-upload-input'), fileSelect)
    xhrMock.onload?.call(xhrMock as XMLHttpRequest, null as unknown as ProgressEvent)

    expect(onRequestChange).toBeCalledWith(expect.objectContaining({ status: 'error' }))
  })
})
