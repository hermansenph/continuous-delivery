import React from 'react'

export default class TodoForm extends React.Component {

  createTodo(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const reqObject = {
      todo: formData.get('todo'),
      dueDate: formData.get('due-date')
    }
    fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(reqObject),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  render() {

    return (
      <form id="todo-form" onSubmit={ this.createTodo }>
        <div className="form-group">
          <label >Todo</label>
          <input type="text" className="form-control" id="todo" name="todo" placeholder="Enter Todo"/>
        </div>
        <div className="form-group">
          <label >Due Date</label>
          <input type="date" className="form-control" id="due-date" name="due-date"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }

}
