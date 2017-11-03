import React from 'react'

export default function TodoList({ todos }) {
  return (
    <ul className="list-group">
      {todos.map(renderTodo)}
    </ul>
  )
}

function renderTodo({ todo, dueDate, id }) {
  return <li className="list-group-item" key={ id }>Task: { todo }<br/> Due Date: { dueDate }</li>
}
