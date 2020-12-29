const _toString = Object.prototype.toString

export function isNumber(val: unknown): val is number {
  return _toString.call(val) === '[object Number]'
}

export function isBoolean(val: unknown): val is boolean {
  return _toString.call(val) === '[object Boolean]'
}

export function isString(val: unknown): val is string {
  return _toString.call(val) === '[object String]'
}

export function isUndefined(val: unknown): val is undefined {
  return _toString.call(val) === '[object Undefined]'
}

export function isNull(val: unknown): val is null {
  return _toString.call(val) === '[object Null]'
}

export function isSymbol(val: unknown): val is symbol {
  return _toString.call(val) === '[object Symbol]'
}

export function isObject(val: unknown): val is typeof Object {
  return _toString.call(val) === '[object Object]'
}

export function isFunction(val: unknown): val is typeof Function {
  return _toString.call(val) === '[object Function]'
}

export function isArray(val: unknown): val is Array<unknown> {
  return _toString.call(val) === '[object Array]'
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

export function isNonNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null
}
