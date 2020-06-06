import React from "react"
import { Emoji } from "emoji-mart"
import customEmojis from "./customEmojis"

export default ({ emoji: userEmoji, ...props }) => {
  const emoji = customEmojis.find(customEmoji =>
    customEmoji.short_names.some(name => name === userEmoji)
  )

  return <Emoji emoji={emoji || userEmoji} set="apple" size={24} {...props} />
}
