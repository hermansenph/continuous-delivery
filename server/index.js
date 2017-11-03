require('dotenv/config')
const { createApp } = require('./create-app')
const todosGateway = require('./todos-gateway')
const { MongoClient } = require('mongodb')

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {

  if (err) console.log(err)

  const collection = db.collection('todos')
  const app = createApp(todosGateway(collection))

  app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

})
