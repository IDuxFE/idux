import { isString } from '@idux/cdk/utils'

interface UseContainer {
  (target: string | HTMLElement): HTMLElement
}

function initializeContainer(): UseContainer {
  const containerHashmap: Record<string, HTMLElement> = {}

  function useContainer(target: string | HTMLElement): HTMLElement {
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

  return useContainer
}

export const useContainer = initializeContainer()
