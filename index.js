const express = require('express')
const app = express()
require('dotenv').config()

const repo = {
  name: 'Continuous Delivery',
  description: 'A practice repository for testing and deployment.'
}
no
app.get('/', (req, res) => {
  res.json(repo)
})

app.listen(process.env.PORT, () => {
  console.log('Listening on' + process.env.PORT)
})
