/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimePickerProps } from './types'
import type { InputPreProcessor, InputValidator } from './usePickerControl'
import type { FormAccessor } from '@idux/cdk/forms'
import type { ComputedRef, Slots } from 'vue'

import { VNodeTypes, inject, withKeys } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { FORM_TOKEN } from '@idux/components/form'
import { IxInput } from '@idux/components/input'

import TimePickerPanel from './TimePickerPanel'
import { useCommonBindings, useCommonInputProps, useCommonPanelProps } from './hooks'
import { normalizeFormat, parseDate } from './utils'

export interface TimePickerRenderers {
  accessor: FormAccessor<Date>
  isDisabled: ComputedRef<boolean>
  renderInput: (attrs?: Record<string, unknown>, slots?: Slots) => VNodeTypes
  renderPanel: (attrs?: Record<string, unknown>) => VNodeTypes
  focus: (options?: FocusOptions | undefined) => void
  blur: () => void
  handleClose: () => void
}

export function useTimePickerRender(
  props: TimePickerProps,
  inputPreProcessors?: InputPreProcessor[],
  inputValidator?: InputValidator,
): TimePickerRenderers {
  const format = normalizeFormat(props.format)

  const _inputProcessors = inputPreProcessors ?? []
  const _inputValidator = inputValidator ?? ((value: string) => !value || parseDate(value, format, true).isValid())
  const {
    inputRef,
    accessor,
    isDisabled,
    inputValue,
    pannelValue,
    handleInputChange,
    handlePanelChange,
    handleClear,
    handleBlur,
    handleFocus,
    handleInputConfirm,
    handleClose,
    focus,
    blur,
  } = useCommonBindings(props, _inputProcessors, _inputValidator)

  const config = useGlobalConfig('timePicker')
  const formContext = inject(FORM_TOKEN, null)
  const inputProps = useCommonInputProps(props, config, formContext)
  const panelProps = useCommonPanelProps(props)
  const _handleInputConfirm = withKeys(handleInputConfirm, ['enter'])

  function renderInput(attrs: Record<string, unknown> = {}, slots: Slots = {}) {
    return (
      <IxInput
        {...inputProps.value}
        ref={inputRef}
        value={inputValue.value}
        disabled={isDisabled.value}
        readonly={props.readonly}
        placeholder={props.placeholder}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClear={handleClear}
        onKeydown={_handleInputConfirm}
        v-slots={slots}
        {...attrs}
      />
    )
  }

  function renderPanel(attrs: Record<string, unknown> = {}) {
    return (
      <TimePickerPanel
        {...panelProps.value}
        defaultOpenValue={props.defaultOpenValue}
        value={pannelValue.value}
        onChange={handlePanelChange}
        {...attrs}
      />
    )
  }

  return {
    accessor,
    isDisabled,
    renderInput,
    renderPanel,
    focus,
    blur,
    handleClose,
  }
}
