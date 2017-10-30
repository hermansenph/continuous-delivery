const express = require('express')
const bodyParser = require('body-parser')

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.',
  url: 'https://github.com/hermansenph/continuous-delivery'
}

function createApp(gateway, collection) {

  const app = express()
  const todos = gateway(collection)

  app
    .use(bodyParser.json())
    .get('/', (req, res) => {
      res.json(repo)
    })
    .post('/find', async (req, res) => {
      const id = bodyParser.json(req.body)
      const foundTodos = await todos.findById({id})
      res.json(foundTodos)
    })
    .post('/create', async (req, res) => {
      const newTodo = req.body
      console.log(newTodo)
      const createdTodo = await todos.create(newTodo)
      res.json(createdTodo)
    })

  return app
}

module.exports = { createApp, repo }
