import { readFileSync } from 'fs-extra'
import path from 'path'
import { Meta } from './types'

const template = readFileSync(path.resolve(__dirname, '../template/title.html'), { encoding: 'utf-8' })

export function generateTitle(meta: Meta, path: string): string {
  return template
    .replace(/{{title}}/g, meta.title || '')
    .replace(/{{subtitle}}/g, meta.subtitle || '')
    .replace(/{{widget}}/g, meta.widget || '')
    .replace(/{{path}}/g, path)
}
