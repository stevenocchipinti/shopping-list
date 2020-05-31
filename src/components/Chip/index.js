import React from "react"
import styled from "styled-components"
import { emojiIndex, Emoji as EmojiMart } from "emoji-mart"

import useLongPress from "./useLongPress"
import { greys } from "../../helpers"
import useSetting from "../../useSetting"

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
  cursor: pointer;

  .emoji-mart-emoji {
    height: 16px;
    margin-right: 4px;
    filter: ${({ done }) => (done ? "grayscale(1) opacity(0.4)" : "none")};
  }
`

const Value = styled.span`
  text-decoration-line: ${({ done }) => (done ? "line-through" : "inherit")};
`

const Qty = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 16px;
  background-color: ${greys("200", "800")};
  border-radius: 0 18px 18px 0;
  padding: 4px 7px 4px 6px;
  margin: 0 -7px 0 7px;
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

const Emoji = React.memo(EmojiMart)

export default ({
  done,
  qty,
  children,
  emoji = null,
  onLongPress,
  ...props
}) => {
  const longPress = useLongPress(onLongPress)
  const [emojiSupport] = useSetting("emojiSupport")
  const searchTerm = children.replace(/i?e?s?$/, "")
  const assumedEmoji = emoji || emojiIndex.search(searchTerm)?.[0]?.id || null
  return (
    <Chip done={done} {...longPress} {...props}>
      {emojiSupport && assumedEmoji && (
        <Emoji emoji={assumedEmoji} set="apple" size={16} />
      )}
      <Value done={done}>{children}</Value>
      {qty && qty > 1 && (
        <Qty>
          <X />
          {qty}
        </Qty>
      )}
    </Chip>
  )
}
