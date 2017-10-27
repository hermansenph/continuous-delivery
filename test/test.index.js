const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const express = require('express')
const app = express()
const request = require('request')
const createApp = require('../create-app')
require('dotenv').config()

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.'
}

describe('app', () => {

  const app = createApp()
  let server

  before(done => {
    server = app.listen(process.env.PORT, () => {
      done()
    })
  })

  after(done => {
    server.close(() => {
      done()
    })
  })

    describe('"/" GET Request', () => {
      it('responds with repo object', (done) => {
        request('http://localhost:' + process.env.PORT, (err, res, body) => {
          expect(JSON.parse(body)).to.deep.equal(repo)
          done()
        })
      })
    })

  })
