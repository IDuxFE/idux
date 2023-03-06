/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface TextareaWithCache extends HTMLTextAreaElement {
  __cdk_measure_textarea?: HTMLTextAreaElement
}

const HIDDEN_TEXTAREA_STYLE = {
  height: '0',
  'min-height': '0',
  'max-height': 'none',
  visibility: 'hidden',
  overflow: 'hidden',
  transition: 'none',
} as const

/**
 * measure `<textarea>` using a cloned node
 *
 * @param textarea HTMLTextAreaElement
 * @param measureFn measure function
 * @param cache whether cache the cloned node
 * @return return value of measure function
 */
export function measureTextarea<V>(
  textarea: HTMLTextAreaElement,
  measureFn: (el: HTMLTextAreaElement) => V,
  cache = true,
): V {
  let clonedTextarea: HTMLTextAreaElement
  const _textarea = textarea as TextareaWithCache
  if (_textarea.__cdk_measure_textarea) {
    clonedTextarea = _textarea.__cdk_measure_textarea
  } else {
    // use a clone element because we have to override some styles.
    clonedTextarea = textarea.cloneNode(false) as HTMLTextAreaElement

    // cache the cloned textarea as a property
    // it should be cleaned after the textarea is destroyed
    cache && (_textarea.__cdk_measure_textarea = clonedTextarea)
  }

  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(key => {
    clonedTextarea.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key as keyof typeof HIDDEN_TEXTAREA_STYLE], 'important')
  })

  textarea.parentNode!.appendChild(clonedTextarea)
  const measureRes = measureFn(clonedTextarea)
  if (clonedTextarea.parentNode) {
    clonedTextarea.parentNode.removeChild(clonedTextarea)
  }

  return measureRes
}
