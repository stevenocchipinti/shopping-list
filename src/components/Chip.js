import React from "react"
import styled from "styled-components"

// This is a color helper to handle light and dark mode
const greys = (light, dark) => ({ theme }) =>
  theme.palette.type === "light"
    ? theme.palette.grey[light]
    : theme.palette.grey[dark]

const Chip = styled.span`
  display: flex;
  align-items: center;
  background-color: ${greys("300", "900")};
  font-size: 14px;
  line-height: 32px;
  border-radius: 16px;
  padding: 0 12px;
  margin: 0.25rem;
  color: ${({ done, theme }) => (done ? theme.palette.grey.A200 : "inherit")};
`

const Value = styled.span`
  text-decoration-line: ${({ done }) => (done ? "line-through" : "inherit")};
`

const Qty = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 16px;
  background-color: ${greys("200", "800")};
  border: 1px solid ${greys("400", "900")};
  border-radius: 0 18px 18px 0;
  padding: 4px 7px 4px 6px;
  margin: 0 -9px 0 7px;
`

const Svg = styled.svg`
  stroke: ${greys("A200", "500")};
  margin-right: 3px;
`

const X = () => (
  <Svg height={6} width={6}>
    <path d="M0 0 L 6 6" />
    <path d="M6 0 L 0 6" />
  </Svg>
)

export default ({ done, qty, children, ...props }) => (
  <Chip done={done} {...props}>
    <Value done={done}>{children}</Value>
    {qty && qty > 1 && (
      <Qty>
        <X />
        {qty}
      </Qty>
    )}
  </Chip>
)
