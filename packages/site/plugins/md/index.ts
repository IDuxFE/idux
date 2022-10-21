import { parseDemoDocs } from './parseDemoDocs'
import { parseIndexDocs } from './parseIndexDocs'
import { parseNormalDocs } from './parseNormalDocs'

export function parseMd(id: string, raw: string): string {
  if (id.match(/\.(zh|en)\.md$/)) {
    if (id.match(/Index\.(zh|en)\.md$/)) {
      return parseIndexDocs(id, raw)
    } else {
      return parseNormalDocs(id, raw)
    }
  }
  return parseDemoDocs(id, raw)
}
