import { onUnmounted } from 'vue'
import { Clipboard } from './clipboard'
import { PendingCopy } from './pendingCopy'

export interface ClipboardConfig {
  attempts: number
}

export const useClipboard = (): { copy: (text: string, attempts?: number) => Promise<boolean> } => {
  const clipboard = Clipboard.getInstance()
  const pendingSet = new Set<PendingCopy>()
  let unmounted = false
  let currentTimeout: number | null = null

  onUnmounted(() => {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout)
    }

    pendingSet.forEach(copy => copy.destroy())
    pendingSet.clear()
    unmounted = true
  })

  function copy(text: string, attempts = 1): Promise<boolean> {
    const promise = new Promise<boolean>((resolve): void => {
      if (attempts > 1) {
        let remainingAttempts = attempts
        const pending = clipboard.beginCopy(text)
        pendingSet.add(pending)

        const attempt = () => {
          const successful = pending.copy()
          if (!successful && --remainingAttempts && !unmounted) {
            currentTimeout = setTimeout(attempt, 1)
          } else {
            currentTimeout = null
            pendingSet.delete(pending)
            pending.destroy()
            resolve(successful)
          }
        }
        attempt()
      } else {
        const successful = clipboard.copy(text)
        resolve(successful)
      }
    })

    return promise
  }

  return { copy }
}
