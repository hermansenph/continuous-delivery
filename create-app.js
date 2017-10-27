const express = require('express')

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.'
  url: 'https://github.com/hermansenph/continuous-delivery'
}

function createApp() {

  const app = express()

  app.get('/', (req, res) => {
    res.json(repo)
  })

  return app
}

module.exports = { createApp, repo }
