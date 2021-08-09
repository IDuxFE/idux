import type { TableComponent } from './src/types'

import Table from './src/Table'

const IxTable = Table as unknown as TableComponent

export { IxTable }

export type { TableInstance, TablePublicProps as TableProps } from './src/types'
