/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DeepPartialGlobalConfig } from '../globalConfig'

const emptyImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMS4zNTglIiB5MT0iMzIlIiB4Mj0iMTAwJSIgeTI9IjY4JSIgaWQ9InByZWZpeF9fYSI+PHN0b3Agc3RvcC1jb2xvcj0iI0U3RUJGMiIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNFMUU1RUIiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDQpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxlbGxpcHNlIGZpbGw9IiNGN0Y5RkMiIGN4PSIyNSIgY3k9IjQ4LjkyIiByeD0iMjUiIHJ5PSIzLjI5Ii8+PHBhdGggZD0iTTEzLjQwOCAxNGgyMy4xODRhMSAxIDAgMDEuODEyLjQxN0w0NSAyNUg1bDcuNTk2LTEwLjU4M2ExIDEgMCAwMS44MTItLjQxN3oiIGZpbGw9IiNFREYxRjciLz48cGF0aCBkPSJNMzkgNC4zMTZsLjkxOS43NzJhLjQuNCAwIDAxLjA1LjU2M2wtMy4zNDMgMy45ODRhLjQuNCAwIDAxLS41NjQuMDQ5bC0uOTItLjc3MmEuNC40IDAgMDEtLjA0OC0uNTYzbDMuMzQyLTMuOTg0QS40LjQgMCAwMTM5IDQuMzE2em0tMjYuOTM4IDBhLjQuNCAwIDAxLjU2NC4wNWwzLjM0MiAzLjk4M2EuNC40IDAgMDEtLjA1LjU2M0wxNSA5LjY4NGEuNC40IDAgMDEtLjU2NC0uMDVsLTMuMzQyLTMuOTgzYS40LjQgMCAwMS4wNDktLjU2M3pNMjYuMTMxIDBjLjIyIDAgLjQuMTguNC40djcuMmEuNC40IDAgMDEtLjQuNGgtMS4yYS40LjQgMCAwMS0uNC0uNFYuNGEuNC40IDAgMDEuNC0uNGgxLjJ6IiBmaWxsPSIjRTNFN0VFIi8+PHBhdGggZD0iTTE1LjQxNiAxNmgxOS4xNjhhMSAxIDAgMDEuODIuNDI3TDQwIDIzSDEwbDQuNTk3LTYuNTczYTEgMSAwIDAxLjgyLS40Mjd6IiBmaWxsPSIjRkFGQ0ZFIi8+PHBhdGggZD0iTTUgMjVoNDB2MjNhMSAxIDAgMDEtMSAxSDZhMSAxIDAgMDEtMS0xVjI1eiIgZmlsbD0idXJsKCNwcmVmaXhfX2EpIi8+PHJlY3QgZmlsbD0iI0ZGRiIgeD0iMTgiIHk9IjM5IiB3aWR0aD0iMTQiIGhlaWdodD0iMyIgcng9Ii40Ii8+PC9nPjwvc3ZnPg=='
export const seerConfig: DeepPartialGlobalConfig = {
  empty: {
    image: emptyImage,
  },
  form: {
    colonless: true,
    labelAlign: 'start',
  },
  modal: {
    width: 400,
  },
  progress: {
    size: 'lg',
    strokeLinecap: 'square',
  },
}
