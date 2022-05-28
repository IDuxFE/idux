'use strict'
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const getScopes = (name, prefix) =>
  fs
    .readdirSync(path.resolve(__dirname, `packages/${name}`), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => prefix + dirent.name)

const scopes = [
  'cdk:*',
  'comp:*',
  'pro:*',
  ...getScopes('cdk', 'cdk:'),
  ...getScopes('components', 'comp:'),
  ...getScopes('pro', 'pro:'),
  'scripts',
  'packaging',
  'release',
  'changelog',
]

// precomputed scope
const scopeMatch = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find(r => ~r.indexOf('M  packages'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/(cdk|components|pro)%%((\w|-)*)/)

const scopeComplete = scopeMatch?.[2] && `${scopeMatch[1].replace('components', 'comp')}:${scopeMatch[2]}`

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': [2, 'always', scopes],
  },
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
  },
}
