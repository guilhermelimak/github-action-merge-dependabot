'use strict'
const tap = require('tap')


const coreStubs = {
  'getInput': () => '',
  debug: msg => msg,
  error: msg => msg,
  info: msg => msg,
  warning: msg => msg,
}

tap.test('MERGE_METHOD should be squash for invalid input', async t => {
  const { getInputs } = t.mock('../src/util', {
    '@actions/core': {
      ...coreStubs
    }
  })
  t.equal(getInputs().MERGE_METHOD, 'squash')
})

tap.test('MERGE_METHOD should be correct for valid input', async t => {
  const { getInputs } = tap.mock('../src/util', {
    '@actions/core': {
      ...coreStubs,
      'getInput': () => 'merge',
    }
  })
  t.equal(getInputs().MERGE_METHOD, 'merge')
})

tap.test('getPackageName should get package name from branch', async t => {
  const { getPackageName } = require('../src/util')

  t.equal(getPackageName("dependabot/github_actions/fastify/github-action-merge-dependabot-2.6.0"), "github-action-merge-dependabot")
  t.equal(getPackageName("dependabot/npm_and_yarn/pkg-0.0.1"), "pkg")
  t.equal(getPackageName("pkg-0.0.1"), "pkg")
})
