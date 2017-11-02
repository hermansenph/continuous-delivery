require('dotenv/config')
const { createApp } = require('./create-app')
const todosGateway = require('./todos-gateway')
const { MongoClient } = require('mongodb')
const express = require('express')
const path = require('path')

console.log(process.env.MONGODB_URI)

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {

  if (err) console.log(err)

  const collection = db.collection('todos')
  const app = createApp(todosGateway(collection))

  app.use(express.static(path.join(__dirname, 'public')))

  app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

})
