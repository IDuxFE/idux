/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface SegmentOverlayUpdateContext {
  triggerOverlayUpdate: () => void
  registerOverlayUpdate: (update: () => void) => void
  unregisterOverlayUpdate: (update: () => void) => void
}

export function useSegmentOverlayUpdate(): SegmentOverlayUpdateContext {
  const updateHandlers = new Set<() => void>()
  const triggerOverlayUpdate = () => {
    for (const update of updateHandlers.values()) {
      update()
    }
  }
  const registerOverlayUpdate = (update: () => void) => {
    updateHandlers.add(update)
  }
  const unregisterOverlayUpdate = (update: () => void) => {
    updateHandlers.delete(update)
  }

  return {
    triggerOverlayUpdate,
    registerOverlayUpdate,
    unregisterOverlayUpdate,
  }
}
