import React from "react"
import styled from "styled-components"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2rem;
`

const Qty = styled(TextField)`
  width: 6rem;
  & .MuiOutlinedInput-input {
    text-align: center;
  }
`

const NumberPicker = ({ onChange, value, ...props }) => {
  const val = parseInt(value)
  const dec = newValue => val - 1 >= 0 && onChange(val - 1)
  const inc = newValue => onChange(val + 1)

  return (
    <Container>
      <IconButton onClick={dec} tabIndex="-1" aria-label="Decrement quantity">
        <RemoveCircleOutlineIcon />
      </IconButton>
      <Qty
        type="tel"
        label="Quantity"
        variant="outlined"
        onChange={e => onChange(e.target.value)}
        value={value}
        {...props}
      />
      <IconButton onClick={inc} tabIndex="-1" aria-label="Increment quantity">
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}

export default NumberPicker
