import React from "react"
import styled from "styled-components"

// This is a color helper to handle light and dark mode
const greys = (light, dark) => ({ theme }) =>
  theme.palette.type === "light"
    ? theme.palette.grey[light]
    : theme.palette.grey[dark]

const Chip = styled.span`
  background-color: ${greys("300", "900")};
  font-size: 14px;
  line-height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  margin: 0.25rem;
  color: ${({ done }) => (done ? "#aaa" : "inherit")};
`

const Value = styled.span`
  text-decoration-line: ${({ done }) => (done ? "line-through" : "inherit")};
`

const Qty = styled.span`
  line-height: 16px;
  background-color: ${greys("200", "800")};
  border: 1px solid ${greys("400", "900")};
  border-radius: 0 18px 18px 0;
  padding: 4px 8px 4px 6px;
  margin: 0 -8px 0 8px;
`

const X = styled.span`
  font-size: 10px;
`

export default ({ done, qty, children, ...props }) => (
  <Chip done={done} {...props}>
    <Value done={done}>{children}</Value>
    {qty && qty > 1 && (
      <Qty>
        <X>&#x2715;</X>
        {qty}
      </Qty>
    )}
  </Chip>
)
