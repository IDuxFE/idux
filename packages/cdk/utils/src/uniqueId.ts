let nodeId = 0
export function uniqueId(prefix = 'ix'): string {
  return `${prefix}-${nodeId++}`
}
