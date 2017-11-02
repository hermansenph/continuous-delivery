const express = require('express')
const bodyParser = require('body-parser')

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.',
  url: 'https://github.com/hermansenph/continuous-delivery'
}

function createApp(gateway) {

  const app = express()
  const todos = gateway

  app
    .use(bodyParser.json())
    .get('/', (req, res) => {
      res.json(repo)
    })
    .get('/todos', async (req, res) => {
      const found = await todos.find()
      res.json(found)
    })
    .get('/todos/:id', async (req, res) => {
      const found = await todos.findById(req.params.id)
      if (found) return res.json(found)
      res.status(404).json({
        error: 'Not Found',
        message: `todo ${req.params.id} does not exist.`
      })
    })
    .post('/todos', async (req, res) => {
      const newTodo = req.body
      const createdTodo = await todos.create(newTodo)
      console.log(createdTodo)
      res.json(createdTodo)
    })

  return app
}

module.exports = { createApp, repo }
