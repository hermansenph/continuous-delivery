import React from 'react'

export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(renderTodo)}
    </ul>
  )
}

function renderTodo({ todo, dueDate, id }) {
  return <li key={ id }>{ todo }<br/> { dueDate }</li>
}
