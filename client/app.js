import React from 'react'
import TodoForm from './todo-form'
import TodoList from './todo-list'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { todos: [] }
    this.createTodo = this.createTodo.bind(this)
  }

  async createTodo(event) {
    event.preventDefault()
    event.persist()
    const formData = new FormData(event.target)
    const reqObject = {
      todo: formData.get('todo'),
      dueDate: formData.get('due-date')
    }
    const res = await fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(reqObject),
      headers: { 'Content-Type': 'application/json' }
    })
    const newTodo = await res.json()
    event.target.reset()
    this.setState({
      users: this.state.todos.concat(newTodo)
    })
    this.componentDidMount()
  }

  async componentDidMount() {
    const res = await fetch('/todos')
    const todos = await res.json()
    this.setState({ todos })
  }

  render() {
    return (
      <div>
        <div className="col-md-4 col-md-offset-4">
          <TodoForm handleSubmit={ this.createTodo }/>
        </div>
        <div className="col-md-4 col-md-offset-4">
          <TodoList todos={ this.state.todos }/>
        </div>
      </div>
    )
  }

}
