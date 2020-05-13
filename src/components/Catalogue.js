import React from "react"
import styled from "styled-components"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import { unslugify } from "../helpers"

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
`

const Catalogue = ({ catalogue, onDelete }) => {
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
