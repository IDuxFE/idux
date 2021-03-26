import { numFormatter } from '../src/numFormatter'
describe('format.ts', () => {
  test('numFormatter function work', () => {
    const formatValue1 = numFormatter(112893.116, 2)
    expect(formatValue1.value).toEqual('112893.11')
    expect(formatValue1.int).toEqual('112893')
    expect(formatValue1.decimal).toEqual('.11')

    const formatValue2 = numFormatter(112893.116, 4)
    expect(formatValue2.value).toEqual('112893.1160')
    expect(formatValue2.int).toEqual('112893')
    expect(formatValue2.decimal).toEqual('.1160')

    const formatValue3 = numFormatter(112893.116, 0)
    expect(formatValue3.value).toEqual('112893')
    expect(formatValue3.int).toEqual('112893')
    expect(formatValue3.decimal).toEqual('')

    const formatValue4 = numFormatter('11.11.2', 2)
    expect(formatValue4.value).toEqual('11.11.2')
    expect(formatValue4.int).toEqual('')
    expect(formatValue4.decimal).toEqual('')

    const formatValue5 = numFormatter('hello', 2)
    expect(formatValue5.value).toEqual('hello')
    expect(formatValue5.int).toEqual('')
    expect(formatValue5.decimal).toEqual('')
  })
})
