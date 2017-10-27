const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const express = require('express')
const app = express()
const http = require('http')
require('dotenv').config()

const options = {
  host: 'localhost:' + process.env.PORT,
  path: '/'
}

describe('"/" GET Request', () => {
  it('responds with repo object', (done) => {
    http.get(options, (res) => {
      expect(res).to.equal(options.json())
    })
    done()
  })
})
