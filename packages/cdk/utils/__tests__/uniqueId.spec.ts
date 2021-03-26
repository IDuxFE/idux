import { uniqueId } from '../src/uniqueId'

describe('uniqueId.ts', () => {
  test('basic', () => {
    const id = uniqueId()
    expect(id).toBeDefined()
  })

  test('prefix', () => {
    const prefix = 'prefix'
    const id = uniqueId(prefix)
    expect(id.startsWith(prefix)).toBeTruthy()
  })

  test('unique', () => {
    const stack: string[] = []
    let num = 10
    while (num) {
      const id = uniqueId()
      expect(stack.includes(id)).toBeFalsy()
      stack.push(id)
      num--
    }
  })
})
