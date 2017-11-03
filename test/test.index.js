const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const { createApp } = require('../server/create-app')
const todosGateway = require('../server/todos-gateway')
const { MongoClient } = require('mongodb')
require('dotenv').config()

describe('app', () => {

  let server
  let db
  let collection

  before(done => {

    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {

      if (err) console.log(err)

      db = _db
      collection = db.collection('todos')

      const app = createApp(todosGateway(collection))

      server = app.listen(process.env.PORT, () => {
        done()
      })

    })

  })

  after(done => {
    server.close(() => {
      done()
    })
    db.close()
  })

  describe('"/todos" POST Request', () => {

    it('responds with created todo', (done) => {
      request.post({
        url: 'http://localhost:' + process.env.PORT + '/todos',
        json: true,
        body: {task: 'complete part 4', date: '11/02/17'}
      },
      (err, res, body) => {
        if (err) console.log(err)
        expect(body)
          .to.be.an('object')
          .with.property('date')
          .that.equals('11/02/17')
        done()
      })

    })

  })

})
