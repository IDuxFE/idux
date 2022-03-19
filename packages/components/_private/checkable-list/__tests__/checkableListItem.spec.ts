import { MountingOptions, mount } from '@vue/test-utils'
import { computed, h } from 'vue'

import { renderWork } from '@tests'

import { IxCheckbox } from '@idux/components/checkbox'

import CheckableListItem from '../src/CheckableListItem'
import { checkableListContext } from '../src/token'
import { CheckableListItemProps } from '../src/types'

const mountGlobalOpts = {
  provide: {
    [checkableListContext as symbol]: {
      mergedPrefixCls: computed(() => 'ix-checkable-list'),
    },
  },
}

describe('CheckableListItem', () => {
  const CheckableListItemMount = (options?: MountingOptions<Partial<CheckableListItemProps>>) =>
    mount(CheckableListItem, { ...(options as MountingOptions<CheckableListItemProps>), global: mountGlobalOpts })

  renderWork<CheckableListItemProps>(CheckableListItem, {
    props: {
      value: '1',
      label: 'Option-1',
      checkable: true,
      removable: true,
      disabled: false,
    },
    global: mountGlobalOpts,
  })

  test('checkable work', async () => {
    const wrapper = CheckableListItemMount({
      props: {
        value: '1',
        label: 'Option-1',
        checked: true,
        checkable: true,
        removable: true,
        disabled: false,
      },
    })

    const checkboxComp = wrapper.findComponent(IxCheckbox)
    expect(checkboxComp.exists()).toBeTruthy()
    expect(checkboxComp.vm.checked).toBe(true)

    await wrapper.setProps({ checkable: false })
    expect(wrapper.findComponent(IxCheckbox).exists()).toBeFalsy()
  })

  test('removable work', async () => {
    const onRemove = jest.fn()
    const wrapper = CheckableListItemMount({
      props: {
        value: '1',
        label: 'Option-1',
        checkable: true,
        removable: true,
        disabled: false,
        onRemove,
      },
    })

    const removeTrigger = wrapper.find('.ix-checkable-list-item-close-icon')
    expect(removeTrigger.exists()).toBeTruthy()
    await removeTrigger.trigger('click')
    expect(onRemove).toBeCalled()

    await wrapper.setProps({ removable: false })
    expect(wrapper.find('.ix-checkable-list-item-close-icon').exists()).toBeFalsy()
  })

  test('disabled work', async () => {
    const onCheckChange = jest.fn()
    const wrapper = CheckableListItemMount({
      props: {
        value: '1',
        label: 'Option-1',
        checkable: true,
        removable: true,
        disabled: true,
        onCheckChange,
      },
    })

    expect(wrapper.classes()).toContain('ix-checkable-list-item-disabled')
    expect(wrapper.find('.ix-checkable-list-item-close-icon').exists()).toBeFalsy()
    await wrapper.findComponent(IxCheckbox).find('input').setValue(true)
    expect(onCheckChange).not.toBeCalled()

    await wrapper.findComponent(IxCheckbox).find('input').setValue(false)

    await wrapper.setProps({ disabled: false })
    expect(wrapper.classes()).not.toContain('ix-checkable-list-item-disabled')
    expect(wrapper.find('.ix-checkable-list-item-close-icon').exists()).toBeTruthy()
    await wrapper.findComponent(IxCheckbox).find('input').setValue(true)
    expect(onCheckChange).toBeCalledWith(true)
  })

  test('slot work', async () => {
    const wrapper = CheckableListItemMount({
      props: {
        value: '1',
        label: 'Option-1',
        checkable: true,
        removable: true,
        disabled: true,
      },
      slots: {
        default: () => h('span', { class: 'custom-label-slot' }),
      },
    })

    expect(wrapper.find('.custom-label-slot').exists()).toBeTruthy()
  })
})
