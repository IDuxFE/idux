import { filterTree, flattenTree, getTreeKeys, mapTree, mergeTree, traverseTree } from '../src/tree'

interface Data {
  key: string
  label: string
  children?: Data[]
}

const treeData: Data[] = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          { label: 'Node 0-0-0', key: '0-0-0' },
          { label: 'Node 0-0-1', key: '0-0-1' },
          { label: 'Node 0-0-2', key: '0-0-2' },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
          { label: 'Node 0-1-2', key: '0-1-2' },
        ],
      },
    ],
  },
  { label: 'Node 1', key: '1' },
]
const treeDataKeys = ['0', '0-0', '0-0-0', '0-0-1', '0-0-2', '0-1', '0-1-0', '0-1-1', '0-1-2', '1']
const treeDataParentsMap = new Map<string, string[]>([
  ['0', []],
  ['1', []],
  ['0-0', ['0']],
  ['0-1', ['0']],
  ['0-0-0', ['0-0', '0']],
  ['0-0-1', ['0-0', '0']],
  ['0-0-2', ['0-0', '0']],
  ['0-1-0', ['0-1', '0']],
  ['0-1-1', ['0-1', '0']],
  ['0-1-2', ['0-1', '0']],
])

describe('tree.ts', () => {
  test('traverseTree work', () => {
    const keys: string[] = []
    traverseTree(treeData, 'children', (item, parents) => {
      keys.push(item.key)
      expect(parents.map(parent => parent.key)).toEqual(treeDataParentsMap.get(item.key))
      expect(parents.every(parent => parent.label === `Node ${parent.key}`)).toBeTruthy()
    })

    expect(keys).toEqual(treeDataKeys)
  })

  test('mapTree work', () => {
    expect(
      mapTree(treeData, 'children', (item, parents) => {
        expect(parents.map(parent => parent.key)).toEqual(treeDataParentsMap.get(item.key))
        expect(parents.every(parent => parent.label === `Node ${parent.key}`)).toBeTruthy()

        return {
          ...item,
          mapped: true,
        }
      }),
    ).toEqual([
      {
        label: 'Node 0',
        key: '0',
        mapped: true,
        children: [
          {
            label: 'Node 0-0',
            key: '0-0',
            mapped: true,
            children: [
              { label: 'Node 0-0-0', key: '0-0-0', mapped: true },
              { label: 'Node 0-0-1', key: '0-0-1', mapped: true },
              { label: 'Node 0-0-2', key: '0-0-2', mapped: true },
            ],
          },
          {
            label: 'Node 0-1',
            key: '0-1',
            mapped: true,
            children: [
              { label: 'Node 0-1-0', key: '0-1-0', mapped: true },
              { label: 'Node 0-1-1', key: '0-1-1', mapped: true },
              { label: 'Node 0-1-2', key: '0-1-2', mapped: true },
            ],
          },
        ],
      },
      { label: 'Node 1', key: '1', mapped: true },
    ])
  })

  test('filterTree work with straytegy or work', () => {
    expect(
      filterTree(
        treeData,
        'children',
        (item, parents) => {
          expect(parents.map(parent => parent.key)).toEqual(treeDataParentsMap.get(item.key))
          expect(parents.every(parent => parent.label === `Node ${parent.key}`)).toBeTruthy()
          return /1/.test(item.label)
        },
        'or',
      ),
    ).toEqual([
      {
        label: 'Node 0',
        key: '0',
        children: [
          {
            label: 'Node 0-0',
            key: '0-0',
            children: [{ label: 'Node 0-0-1', key: '0-0-1' }],
          },
          {
            label: 'Node 0-1',
            key: '0-1',
            children: [
              { label: 'Node 0-1-0', key: '0-1-0' },
              { label: 'Node 0-1-1', key: '0-1-1' },
              { label: 'Node 0-1-2', key: '0-1-2' },
            ],
          },
        ],
      },
      { label: 'Node 1', key: '1' },
    ])
  })

  test('filterTree work with straytegy and work', () => {
    expect(
      filterTree(
        treeData,
        'children',
        (item, parents) => {
          expect(parents.map(parent => parent.key)).toEqual(treeDataParentsMap.get(item.key))
          expect(parents.every(parent => parent.label === `Node ${parent.key}`)).toBeTruthy()
          return /1/.test(item.label)
        },
        'and',
      ),
    ).toEqual([{ label: 'Node 1', key: '1' }])
  })

  test('mergeTree work', () => {
    interface TargetData extends Data {
      overidden?: boolean
      children?: TargetData[]
    }

    expect(
      mergeTree(
        treeData,
        [
          {
            label: 'Node 0',
            key: '0',
            children: [
              {
                label: 'Node 0-0',
                key: '0-0',
                children: [
                  { label: 'Node 0-0-1-overidden', key: '0-0-1', overidden: true },
                  { label: 'Node 0-0-3', key: '0-0-3' },
                ],
              },
              {
                label: 'Node 0-1',
                key: '0-1',
                children: [{ label: 'Node 0-1-3', key: '0-1-3' }],
              },
            ],
          },
          { label: 'Node 2', key: '2' },
        ] as TargetData[],
        'children',
        item => item.key,
      ),
    ).toEqual([
      {
        label: 'Node 0',
        key: '0',
        children: [
          {
            label: 'Node 0-0',
            key: '0-0',
            children: [
              { label: 'Node 0-0-0', key: '0-0-0' },
              { label: 'Node 0-0-1-overidden', key: '0-0-1', overidden: true },
              { label: 'Node 0-0-2', key: '0-0-2' },
              { label: 'Node 0-0-3', key: '0-0-3' },
            ],
          },
          {
            label: 'Node 0-1',
            key: '0-1',
            children: [
              { label: 'Node 0-1-0', key: '0-1-0' },
              { label: 'Node 0-1-1', key: '0-1-1' },
              { label: 'Node 0-1-2', key: '0-1-2' },
              { label: 'Node 0-1-3', key: '0-1-3' },
            ],
          },
        ],
      },
      { label: 'Node 1', key: '1' },
      { label: 'Node 2', key: '2' },
    ])
  })

  test('flattenTree work', () => {
    expect(flattenTree(treeData, 'children').map(item => item.key)).toEqual(treeDataKeys)
  })
  test('flattenTree with Map work', () => {
    const flattenedTree = flattenTree(treeData, 'children', item => ({ ...item, mapped: true }))
    expect(flattenedTree.map(item => item.key)).toEqual(treeDataKeys)
    expect(flattenedTree.every(item => item.mapped)).toBeTruthy()
  })
  test('flattenTree with leafOnly work', () => {
    expect(flattenTree(treeData, 'children', undefined, true).map(item => item.key)).toEqual([
      '0-0-0',
      '0-0-1',
      '0-0-2',
      '0-1-0',
      '0-1-1',
      '0-1-2',
      '1',
    ])
  })

  test('getTreeKeys work', () => {
    expect(getTreeKeys(treeData, 'children', item => item.key)).toEqual(treeDataKeys)
  })
  test('getTreeKeys with leafOnly work', () => {
    expect(getTreeKeys(treeData, 'children', item => item.key, true)).toEqual([
      '0-0-0',
      '0-0-1',
      '0-0-2',
      '0-1-0',
      '0-1-1',
      '0-1-2',
      '1',
    ])
  })
})
