import React from "react"
import styled from "styled-components"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core"
import { Delete as DeleteIcon } from "@material-ui/icons"

import { unslugify } from "../helpers"
import { useAppState } from "./Backend"

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
`

const Placeholder = styled(TableCell).attrs({
  colSpan: 3,
  component: "th",
  scope: "row",
  children: "No history yet",
})`
  &&& {
    border: none;
    text-align: center;
    height: 4rem;
    margin: 10px;
    padding: 3rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const Catalogue = ({ onDelete }) => {
  const { catalogue, loading } = useAppState()

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="History table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Section</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && Object.keys(catalogue).length === 0 && (
              <TableRow>
                <Placeholder />
              </TableRow>
            )}
            {Object.keys(catalogue).map(item => (
              <TableRow key={item}>
                <TableCell component="th" scope="row">
                  {unslugify(item)}
                </TableCell>
                <TableCell>{catalogue[item].section}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDelete(item)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default Catalogue
