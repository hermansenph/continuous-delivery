const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const express = require('express')
const app = express()
const request = require('request')
require('dotenv').config()

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.'
}

describe('"/" GET Request', () => {
  it('responds with repo object', (done) => {
    request('http://localhost:' + process.env.PORT, (err, res, body) => {
      expect(JSON.parse(body)).to.deep.equal(repo)
      done()
    })
  })
})
