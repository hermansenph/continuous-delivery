import React from 'react'

export default function TodoForm({ handleSubmit }) {
  return (
    <form id="todo-form" onSubmit={ handleSubmit }>
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
