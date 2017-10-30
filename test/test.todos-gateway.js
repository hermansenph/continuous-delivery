require('dotenv').config()
const { describe, before, beforeEach, after, it } = require('mocha')
const { expect } = require('chai')
const uuid = require('uuid/v4')
const { MongoClient } = require('mongodb')
const todosGateway = require('../todos-gateway')

describe('todosGateway', () => {

  let db
  let todos
  let collection
  const testId = uuid()

  before('connect to mongodb', done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) return done(err)
      db = _db
      collection = db.collection('todos')
      todos = todosGateway(collection)
      done()
    })
  })

  after('disconnect from mongodb', () => db.close())

  beforeEach('reset todos collection', async () => {
    await collection.deleteMany()
    await collection.insertOne({
      id: testId,
      task: 'write tests',
      dueDate: new Date()
    })
  })

  describe('find', () => {

    describe('when the todo exists', () => {

      it('returns the found todo', async () => {
        const found = await todos.findById(testId)
        expect(found[0])
          .to.be.an('object')
          .with.property('id')
          .that.equals(testId)
      })

    })

    describe('when the todo does not exist', () => {

      it('returns null', async () => {
        const found = await todos.findById('lol')
        expect(found).to.deep.equal([])
      })

    })

  })
})
