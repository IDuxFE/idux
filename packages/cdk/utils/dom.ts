/* istanbul ignore file */

const trim = (s: string) => (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')

export function on(
  el: HTMLElement | Document | Window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions | undefined,
): void {
  if (el && type && listener) {
    el.addEventListener(type, listener, options ?? true)
  }
}

export function off(
  el: HTMLElement | Document | Window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions | undefined,
): void {
  if (el && type && listener) {
    el.removeEventListener(type, listener, options ?? true)
  }
}

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return ` ${el.className} `.indexOf(` ${cls} `) > -1
  }
}

export function addClass(el: HTMLElement, cls: string): void {
  if (!el) {
    return
  }
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
