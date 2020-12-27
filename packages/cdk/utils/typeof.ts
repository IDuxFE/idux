const _toString = Object.prototype.toString

/**
 * @param val a value need to check
 * @returns {Boolean} val is number
 */
export function isNumber(val: unknown): val is number {
  return _toString.call(val) === '[object Number]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is boolean
 */
export function isBoolean(val: unknown): val is boolean {
  return _toString.call(val) === '[object Boolean]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is string
 */
export function isString(val: unknown): val is string {
  return _toString.call(val) === '[object String]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is undefined
 */
export function isUndefined(val: unknown): val is undefined {
  return _toString.call(val) === '[object Undefined]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is null
 */
export function isNull(val: unknown): val is null {
  return _toString.call(val) === '[object Null]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is Symbol
 */
export function isSymbol(val: unknown): val is symbol {
  return _toString.call(val) === '[object Symbol]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is object
 */
export function isObject(val: unknown): val is typeof Object {
  return _toString.call(val) === '[object Object]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is Function
 */
export function isFunction(val: unknown): val is typeof Function {
  return _toString.call(val) === '[object Function]'
}

/**
 * @param val a value need to check
 * @returns {Boolean} val is Function
 */
export function isArray(val: unknown): val is Array<unknown> {
  return _toString.call(val) === '[object Array]'
}
