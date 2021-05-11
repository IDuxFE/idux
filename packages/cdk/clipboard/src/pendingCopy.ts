/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Logger } from '@idux/cdk/utils'

/**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a relayout. This relayout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * relayout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
export class PendingCopy {
  private _textarea: HTMLTextAreaElement | undefined

  constructor(text: string) {
    const textarea = (this._textarea = document.createElement('textarea'))
    const styles = textarea.style

    // Hide the element for display and accessibility. Set an
    // absolute position so the page layout isn't affected.
    styles.opacity = '0'
    styles.position = 'absolute'
    styles.left = styles.top = '-999em'
    textarea.setAttribute('aria-hidden', 'true')
    textarea.value = text
    document.body.appendChild(textarea)
  }

  /** Finishes copying the text. */
  copy(): boolean {
    const textarea = this._textarea
    let successful = false

    try {
      // Older browsers could throw if copy is not supported.
      if (textarea) {
        const currentFocus = document.activeElement as unknown as HTMLOrSVGElement | null

        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)
        successful = document.execCommand('copy')

        if (currentFocus) {
          currentFocus.focus()
        }
      }
    } catch (err) {
      Logger.error(err)
    }

    return successful
  }

  /** Cleans up DOM changes used to perform the copy operation. */
  destroy(): void {
    const textarea = this._textarea

    if (textarea) {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea)
      }

      this._textarea = undefined
    }
  }
}
