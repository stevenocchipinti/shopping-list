import React, { useState } from "react"
import styled from "styled-components"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

import { AddPlannerItemDialog } from "./ItemDialog"
import Chip from "./Chip"
import { unslugify } from "../helpers"

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 10px 100px 10px;
`

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const ChipTableCell = styled(TableCell)`
  padding-left: 0;
  height: 74px;
  width: 100%;
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

const Planner = ({ onAdd, onEdit, planner, catalogue, loading }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [dayToAddTo, setDayToAddTo] = useState(null)

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table aria-label="Planner table">
          <TableBody>
            {days.map(day => (
              <TableRow key={day}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                <ChipTableCell>
                  <ChipContainer>
                    {planner?.[day]?.items?.map((item, index) => (
                      <Chip
                        key={index}
                        onClick={() => console.log("Goto", item)}
                        onLongPress={() => onEdit(item)}
                      >
                        {unslugify(item)}
                      </Chip>
                    ))}
                    {!loading && (
                      <AddButton
                        onClick={() => {
                          setDayToAddTo(day)
                          setAddDialogOpen(true)
                        }}
                      />
                    )}
                  </ChipContainer>
                </ChipTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddPlannerItemDialog
        day={dayToAddTo}
        days={days}
        open={addDialogOpen}
        onChangeDay={day => setDayToAddTo(day)}
        onSubmit={entry => onAdd(entry)}
        onClose={() => {
          setAddDialogOpen(false)
          setDayToAddTo(null)
        }}
        planner={planner}
        catalogue={catalogue}
      />
    </Wrapper>
  )
}

export default Planner
