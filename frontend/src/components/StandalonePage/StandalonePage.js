import React from 'react'

export default function StandalonePage(props) {
  return (
    <main className="standalone-page">
      <div className="standalone-page-content">{props.children}</div>
    </main>
  )
}
