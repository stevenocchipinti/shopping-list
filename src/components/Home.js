import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import { generateListName } from "./Backend"
import { CircularProgress } from "@material-ui/core"

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`

const LoadingScreen = () => (
  <Container>
    <CircularProgress />
  </Container>
)

const Home = props => {
  const [listName, setListName] = useState()

  useEffect(() => {
    setListName(window.localStorage.getItem("listName"))
  }, [])

  const newList = `/list/${generateListName()}`
  const previousList = `/list/${listName}`

  if (listName === undefined) return <LoadingScreen />
  else if (listName === null) return <Redirect to={newList} />
  else return <Redirect to={previousList} />
}

export default Home
