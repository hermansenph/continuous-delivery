const uuid = require('uuid/v4')

module.exports = function todosGateway(collection) {
  return {
    async create(newTodo) {
      const todo = Object.assign({ id: uuid() }, newTodo)
      await collection.insertOne(todo)
      return todo
    },
    async find() {
      const found = await collection.find({}).toArray()
      return found
    },
    async findById(id) {
      const found = await collection.findOne({ id })
      return found
    },
    async updateById(id, updates) {
      await collection.updateOne({ id }, { $set: updates })
      return this.findById(id)
    },
    async deleteById(id) {
      const result = await collection.deleteOne({ id })
      return result.deletedCount
    }
  }
}
