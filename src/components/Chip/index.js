import React from "react"
import "./index.css"

export default ({ done, qty, children, ...props }) => {
  const classNames = done ? "chip chip--done" : "chip"
  return (
    <span className={classNames} {...props}>
      <span className="chip__val">{children}</span>
      {qty && qty > 1 && (
        <span className="chip__qty">
          <span className="chip__x">&#x2715;</span>
          {qty}
        </span>
      )}
    </span>
  )
}
