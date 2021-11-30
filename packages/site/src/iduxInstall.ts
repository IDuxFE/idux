/* eslint-disable import/order */
import type { App, Directive, Plugin } from 'vue'

// eslint-disable-next-line camelcase
import { useLocale, zh_CN } from '@idux/components/i18n'

useLocale(zh_CN)

import { createGlobalConfig } from '@idux/components/config'
import { IDUX_ICON_DEPENDENCIES, addIconDefinitions } from '@idux/components/icon'

// 静态加载: `IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。
addIconDefinitions(IDUX_ICON_DEPENDENCIES)

// 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
const loadIconDynamically = (iconName: string) => {
  return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

const plugins: Plugin[] = [globalConfig]

import { clickOutside } from '@idux/cdk/click-outside'
import { IxTypography } from '@idux/components/typography'

const directives: Record<string, Directive> = {
  clickOutside,
  typography: IxTypography,
}

const install = (app: App): void => {
  plugins.forEach(plugin => {
    app.use(plugin)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

export default { install }
