import { isString } from 'lodash-es'

const containerHashmap: Record<string, HTMLElement> = {}

export function useContainer(target: string | HTMLElement): HTMLElement {
  if (!isString(target)) {
    return target
  }
  if (containerHashmap[target]) {
    return containerHashmap[target]
  }
  const container = document.createElement('div')
  container.classList.add(target)
  document.body.appendChild(container)
  containerHashmap[target] = container
  return container
}
