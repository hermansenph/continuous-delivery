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

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on ' + process.env.PORT)
})

before(() => {

  app.get('/', (req, res) => {
    res.json(repo)
  })

  server

})

after(() => {
  server.close()
})

describe('"/" GET Request', () => {
  it('responds with repo object', (done) => {
    http.get(options, (res) => {
      expect(res).to.equal(options.json())
    })
    done()
  })
})
