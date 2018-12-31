import React from 'react'
import { Link } from 'react-router-dom'

function App({ item }, onUpdate) {
  return (
    <li className="app">
      <Link to={`/apps/${item.id}`}>
        <img src={item.logo} alt={item.name} />
        <div className>{item.name}</div>
      </Link>
    </li>
  )
}

export default function Apps({
  error,
  items,
  fetchApps,
  showSuccessToast,
  showErrorToast
}) {
  if (!items || !items.length) {
    fetchApps()
    return <div>LOADING APPS...</div>
  }

  return (
    <ul className="apps">
      {items.map(item => (
        <App key={item.id} item={item} />
      ))}
    </ul>
  )
}
