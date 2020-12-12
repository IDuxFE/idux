'use strict'
const message = process.env['HUSKY_GIT_PARAMS']
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const scopes = ['release', 'packaging', 'scripts', 'changelog', 'cdk:*', 'comp:*', 'pro:*']

function parseMessage(message) {
  const PATTERN = /^(\w+)(?:\(([^)]+)\))?: (.+)$/
  const match = PATTERN.exec(message)
  if (!match) {
    return null
  }
  return {
    type: match[1] || null,
    scope: match[2] || null,
  }
}

function getScopesRule() {
  const messages = fs.readFileSync(message, { encoding: 'utf-8' })
  const parsed = parseMessage(messages.split('\n')[0])
  if (!parsed) {
    return [2, 'always', scopes]
  }
  const { scope, type } = parsed
  if (scope && !scopes.includes(scope) && type !== 'release' && !/cdk:.+/.test(scope) && !/component:.+/.test(scope)) {
    return [2, 'always', scopes]
  } else {
    return [2, 'always', []]
  }
}

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': getScopesRule,
  },
}
