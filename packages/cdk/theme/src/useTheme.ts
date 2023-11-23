/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, onMounted } from 'vue'

import { debounce } from 'lodash-es'

import { Logger, createSharedComposable, tryOnScopeDispose, useState } from '@idux/cdk/utils'

export interface UseThemeParams<Theme extends string> {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'body''
   */
  selector?: string | Element | null | undefined
  /**
   * HTML attribute applying the target element
   *
   * @default 'color-schema''
   */
  attribute?: string

  /**
   * The initial value of the theme
   */
  defaultTheme?: Theme

  /**
   * The map of the theme value and the corresponding attribute value
   */
  themes?: Theme[]

  /**
   * Debounce time for updating the theme value
   */
  debounceTime?: number
}

export interface UseThemeReturns<Theme extends string> {
  theme: ComputedRef<Theme>
  changeTheme: (theme: Theme) => void
}

/**
 * reactivy theme hook
 */
export const useTheme = createSharedComposable(
  <Theme extends string>(options: UseThemeParams<Theme> = {}): UseThemeReturns<Theme> => {
    const {
      selector = 'body',
      attribute = 'color-schema',
      defaultTheme = 'default' as Theme,
      themes = [],
      debounceTime = 300,
    } = options

    const mergedThemes = [...themes]

    const requiredOptions: Required<UseThemeParams<Theme>> = {
      selector,
      attribute,
      themes: mergedThemes,
      defaultTheme,
      debounceTime,
    }

    const [theme, setTheme] = useState<Theme>(getHTMLAttrs(requiredOptions))
    const updateThemeAttrs = () => {
      updateHTMLAttrs(
        Object.assign({}, requiredOptions, {
          defaultTheme: theme.value,
        }),
      )
    }

    updateThemeAttrs()

    const changeTheme = (newTheme: Theme) => {
      setTheme(newTheme)
      updateThemeAttrs()
    }

    const onDomChange = debounce(() => {
      const oldTheme = theme.value
      const newTheme = getHTMLAttrs(
        Object.assign({}, requiredOptions, {
          defaultTheme: theme.value,
        }),
      )
      // 这里需要手动节流一下，否则会重复更新 theme 的值
      if (oldTheme !== newTheme) {
        changeTheme(newTheme)
      }
    }, debounceTime)

    let observer: MutationObserver
    onMounted(() => {
      if (observer) {
        return
      }
      observer = new MutationObserver(onDomChange)
      const el = getEl(selector)
      if (el) {
        observer.observe(el, {
          attributes: true,
          attributeFilter: [attribute],
        })
      }
    })
    tryOnScopeDispose(() => {
      observer?.disconnect
    })

    return {
      theme,
      changeTheme,
    }
  },
)

function getEl(selector: UseThemeParams<string>['selector']) {
  const el = typeof selector === 'string' ? window?.document.querySelector(selector) : selector

  if (!el && __DEV__) {
    Logger.warn('cdk/theme', `The element holding the theme cannot be found.`)
  }

  return el
}

/**
 * Update the HTML attribute of the target element
 */
function updateHTMLAttrs<Theme extends string>(options: Required<UseThemeParams<Theme>>) {
  const { selector, attribute, themes, defaultTheme } = options

  const el = getEl(selector)
  if (!el) {
    return
  }

  if (attribute !== 'class') {
    el.setAttribute(attribute, defaultTheme)
    return
  }

  const currentCls = defaultTheme.split(/\s+/g)
  Object.values(themes)
    .flatMap(i => String(i || '').split(/\s/g))
    .filter(Boolean)
    .forEach(v => {
      if (currentCls.includes(v)) {
        el.classList.add(v)
      } else {
        el.classList.remove(v)
      }
    })
}

function getHTMLAttrs<Theme extends string>(options: Required<UseThemeParams<Theme>>): Theme {
  const { selector, attribute, themes, defaultTheme } = options
  const el = getEl(selector)
  if (!el) {
    return defaultTheme
  }

  const val = el.getAttribute(attribute) ?? defaultTheme
  if (attribute !== 'class') {
    return val as Theme
  }

  const currentCls = val.split(/\s+/g)
  return (themes.filter(targetValue => currentCls.includes(targetValue)).at(0) ?? defaultTheme) as Theme
}
