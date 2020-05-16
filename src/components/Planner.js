import React from "react"
import styled from "styled-components"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

import Chip from "./Chip"
// import { unslugify } from "../helpers"

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 10px 100px 10px;
`

const Placeholder = styled(TableCell).attrs({
  colSpan: 3,
  component: "th",
  scope: "row",
  children: "Nothing yet",
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

const AddButton = styled(IconButton).attrs({
  "aria-label": "add",
  children: <AddIcon />,
  size: "small",
})`
  && {
    border: 1px dashed grey;
    margin: 4px;
  }
`

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

// Dummy
const data = {
  Monday: [
    { name: "Salmon", quantity: 1 },
    { name: "Sweet potato", quantity: 1 },
  ],
  Tuesday: [],
  Wednesday: [
    { name: "Salmon", quantity: 1 },
    { name: "Sweet potato", quantity: 1 },
    { name: "Beans", quantity: 1 },
  ],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
}

const Planner = ({ catalogue, loading }) => {
  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table aria-label="Planner table">
          <TableBody>
            {!loading && Object.keys(catalogue).length === 0 && (
              <TableRow>
                <Placeholder />
              </TableRow>
            )}
            {days.map(day => (
              <TableRow key={day}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                <TableCell style={{ paddingLeft: 0, height: 72 }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {data[day]?.map((item, index) => (
                      <Chip
                        key={index}
                        onClick={() => {}}
                        onLongPress={() => {}}
                        qty={item.quantity}
                        done={item.done}
                      >
                        {item.name}
                      </Chip>
                    ))}
                    <AddButton />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default Planner
