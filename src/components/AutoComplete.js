import React, { forwardRef } from "react"
import styled from "styled-components"
import MuiAutoComplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"

const StyledAutoComplete = styled(MuiAutoComplete)`
  margin-bottom: 1rem;
`

const AutoComplete = forwardRef(({ value, onChange, ...props }, ref) => {
  const caseInsensitiveCompare = (option, value) =>
    option.toLowerCase() === value.toLowerCase()

  const fuzzy = (options, { inputValue }) => {
    const r = new RegExp(".*" + inputValue.split("").join(".*") + ".*", "i")
    return options.filter(o => r.exec(o))
  }

  return (
    <StyledAutoComplete
      freeSolo
      inputValue={value}
      onInputChange={(_, newValue) => onChange(newValue)}
      getOptionSelected={caseInsensitiveCompare}
      filterOptions={fuzzy}
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
})

export default AutoComplete
