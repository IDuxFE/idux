import { parseGlobalDocs } from './parseGlobalDocs'
import { parsePackageDemo } from './parsePackageDemo'
import { parsePackageDocs } from './parsePackageDocs'

export function parseMd(id: string, raw: string): string {
  if (id.match(/\.(zh|en)\.md$/)) {
    if (id.match(/Index\.(zh|en)\.md$/)) {
      return parsePackageDocs(id, raw)
    } else {
      return parseGlobalDocs(id, raw)
    }
  }
  return parsePackageDemo(id, raw)
}
