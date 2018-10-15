'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // HOST_NAME: '"localhost:48403"'
  HOST_NAME: '"222.200.180.59:8888"'
})
