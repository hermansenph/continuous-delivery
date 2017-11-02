require('dotenv').config()
const { createApp } = require('./server/create-app')
const todosGateway = require('./server/todos-gateway')
const { MongoClient } = require('mongodb')

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {

  const collection = db.collection('todos')
  const app = createApp(todosGateway(collection))

  app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

})
