import { ResizeObserver } from '@juggle/resize-observer'

import { defaultConfig } from '@idux/components/config'
import { addIconDefinitions } from '@idux/components/icon'
import * as allIcon from '@idux/components/icon/src/definitions'

defaultConfig.theme.hashed = false

addIconDefinitions(Object.values(allIcon))

global.ResizeObserver = ResizeObserver

const { getComputedStyle } = window
window.getComputedStyle = elt => getComputedStyle(elt)
