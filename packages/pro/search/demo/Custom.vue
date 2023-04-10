<template>
  <IxProSearch
    v-model:value="searchValue"
    style="width: 100%"
    :searchFields="searchFields"
    :onChange="onChange"
    :onSearch="onSearch"
    overlayContainer="demo-pro-search-custom"
  >
    <template #userForm="{ value, setValue, ok }">
      <IxSpace class="demo-pro-search-custom-user-form" vertical>
        <IxSpace>
          <label class="label">username: </label>
          <IxInput
            class="value"
            :value="value?.username"
            :onChange="input => setValue({ ...(value ?? {}), username: input })"
            :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
          />
        </IxSpace>
        <IxSpace>
          <label class="label">gender: </label>
          <IxSelect
            class="value"
            overlayContainer="demo-pro-search-custom"
            :value="value?.gender"
            :onChange="gender => setValue({ ...(value ?? {}), gender })"
            :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
          >
            <IxSelectOption key="male" value="male"> male </IxSelectOption>
            <IxSelectOption key="female" value="female"> female </IxSelectOption>
          </IxSelect>
        </IxSpace>
        <IxSpace>
          <label class="label">phone: </label>
          <IxInput
            class="value"
            :value="value?.phone"
            :onChange="input => setValue({ ...(value ?? {}), phone: input })"
            :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
          />
        </IxSpace>
      </IxSpace>
    </template>
  </IxProSearch>
</template>

<script setup lang="ts">
import type { SearchField, SearchValue } from '@idux/pro/search'

import { ref } from 'vue'

interface UserData {
  username: string
  phone: string
  gender: 'male' | 'female'
}

const userReg = /^(\w+)-(male|female): (\d+)$/
const searchValue = ref<SearchValue[]>([])
const searchFields: SearchField[] = [
  {
    type: 'custom',
    key: 'custom_input',
    label: 'IP Input',
    fieldConfig: {
      parse: input => {
        return input.split(',').map(ip => ip.trim())
      },
      format: value => {
        if (!value) {
          return ''
        }

        return (value as string[]).join(', ')
      },
    },
  },
  {
    type: 'custom',
    key: 'custom_form',
    label: 'User',
    defaultValue: {
      username: 'Kirito',
      gender: 'male',
      phone: '103006',
    },
    inputClassName: 'demo-pro-search-custom-user-form-input',
    fieldConfig: {
      customPanel: 'userForm',
      parse: input => {
        const res = input.match(userReg)
        if (!res) {
          return
        }

        const username = res[1]
        const gender = res[2]
        const phone = res[3]

        /* eslint-disable indent */
        return username || gender || phone
          ? {
              username,
              gender,
              phone,
            }
          : undefined
        /* eslint-enable indent */
      },
      format: value => {
        if (!value) {
          return ''
        }

        const { username, gender, phone } = value as UserData
        return `${username ?? 'username'}-${gender ?? 'gender'}: ${phone ?? 'phone'}`
      },
    },
  },
]

const onChange = (value: SearchValue[] | undefined, oldValue: SearchValue[] | undefined) => {
  console.log(value, oldValue)
}
const onSearch = () => {
  console.log('onSearch')
}
const handleUserFormKeyDown = (evt: KeyboardEvent, confirm: () => void) => {
  if (evt.key === 'Enter') {
    confirm()
  }
}
</script>

<style lang="less">
.demo-pro-search-custom-user-form {
  height: 200px;
  padding: 8px;
  box-shadow: inset 0 0 2px #684545;

  .label {
    display: inline-block;
    width: 70px;
  }
  .value {
    width: 200px;
  }
}
.demo-pro-search-custom-user-form-input {
  color: #684545;
  text-align: center;
}
</style>
