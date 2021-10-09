/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { PendingCopy } from './pendingCopy'

export class Clipboard {
  public static getInstance(): Clipboard {
    if (!Clipboard.instance) {
      Clipboard.instance = new Clipboard()
    }
    return Clipboard.instance
  }

  private static instance: Clipboard | null = null
  private constructor() {}

  copy(text: string): boolean {
    const pendingCopy = this.beginCopy(text)
    const successful = pendingCopy.copy()
    pendingCopy.destroy()

    return successful
  }

  beginCopy(text: string): PendingCopy {
    return new PendingCopy(text)
  }
}
