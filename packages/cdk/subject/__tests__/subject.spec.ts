import { isObject } from '@idux/cdk/utils'
import { Subject } from '../src/subject'

describe('subject.ts', () => {
  test('new Subject work', () => {
    const subject = new Subject()
    expect(isObject(subject)).toBeTruthy()
  })

  test('no type subject', () => {
    const subject = new Subject()

    subject.subscribe(value => {
      expect(value).toBeUndefined()
    })

    subject.dispatch()
    subject.dispatch(undefined)
  })

  test('string type subject', () => {
    const subject = new Subject<string>()
    const strings = ['foo', 'bar']

    subject.subscribe(value => {
      expect(value).toEqual(strings.shift())
    })

    const [foo, bar] = strings
    subject.dispatch(foo)
    subject.dispatch(bar)
  })

  test('unsubscribe', () => {
    const subject = new Subject()
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})

    const { unsubscribe } = subject.subscribe(() => log)
    unsubscribe()
    subject.dispatch()

    expect(log).not.toBeCalled()
  })

  test('unsubscribeAll', () => {
    const subject = new Subject()
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})

    subject.subscribe(() => log)

    subject.subscribe(() => log)
    subject.unsubscribeAll()
    subject.dispatch()
    expect(log).not.toBeCalled()
  })
})
