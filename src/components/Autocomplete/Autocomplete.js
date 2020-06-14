import React, { useState, useRef, useCallback, forwardRef } from "react"
import styled from "styled-components"

import { Autocomplete as MuiAutocomplete } from "@material-ui/lab"
import { TextField, IconButton } from "@material-ui/core"
import {
  Delete as DeleteIcon,
  InsertEmoticon as InsertEmoticonIcon,
} from "@material-ui/icons"

import { EmojiPicker, Emoji } from "../Emoji"
import useSetting from "../../useSetting"

const StyledAutocomplete = styled(MuiAutocomplete)`
  margin-bottom: 2rem;
`

const caseInsensitiveCompare = (option, value) =>
  option.toLowerCase() === value.toLowerCase()

const fuzzy = (options, { inputValue }) => {
  const r = new RegExp(".*" + inputValue.split("").join(".*") + ".*", "i")
  return options.filter(o => r.exec(o))
}

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Option = ({ option, onDelete }) => {
  const handleClick = e => {
    e.stopPropagation()
    onDelete(option)
  }
  return (
    <OptionWrapper>
      <span>{option}</span>
      <IconButton
        edge="end"
        size="small"
        onClick={handleClick}
        aria-label="delete"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </OptionWrapper>
  )
}

const Autocomplete = forwardRef(
  ({ onDelete, emoji, onEmojiChange, ...props }, ref) => {
    const emojiPickerRef = useRef()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const emojiPickerOpen = Boolean(anchorEl)

    const [emojiSupport] = useSetting("emojiSupport")
    const emojiProps =
      emojiSupport && (emoji || onEmojiChange)
        ? {
            style: { padding: 4 },
            startAdornment: (
              <IconButton ref={emojiPickerRef} onClick={handleClick}>
                {emoji ? <Emoji emoji={emoji} /> : <InsertEmoticonIcon />}
              </IconButton>
            ),
          }
        : {}

    const memoOption = useCallback(
      option => <Option option={option} onDelete={onDelete} />,
      [onDelete]
    )

    return (
      <>
        {emojiSupport && (
          <EmojiPicker
            onSelect={onEmojiChange}
            open={emojiPickerOpen}
            anchorEl={emojiPickerRef.current}
            onClose={handleClose}
          />
        )}
        <StyledAutocomplete
          freeSolo
          getOptionSelected={caseInsensitiveCompare}
          filterOptions={fuzzy}
          renderOption={onDelete ? memoOption : undefined}
          renderInput={params => (
            <TextField
              {...params}
              autoFocus={props.autoFocus}
              label={props.label}
              inputRef={ref}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                ...emojiProps,
              }}
            />
          )}
          {...props}
        />
      </>
    )
  }
)

export default Autocomplete
