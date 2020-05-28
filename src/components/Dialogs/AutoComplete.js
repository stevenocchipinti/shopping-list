import React, { useCallback, forwardRef } from "react"
import styled from "styled-components"
import MuiAutoComplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

const StyledAutoComplete = styled(MuiAutoComplete)`
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

const AutoComplete = forwardRef(
  ({ value, onChange, onDelete, ...props }, ref) => {
    const memoOption = useCallback(
      option => <Option option={option} onDelete={onDelete} />,
      [onDelete]
    )
    return (
      <StyledAutoComplete
        freeSolo
        inputValue={value}
        onInputChange={(e, newValue) => e && onChange(newValue)}
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
          />
        )}
        {...props}
      />
    )
  }
)

export default AutoComplete
