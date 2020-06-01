import React, { useState, useEffect } from "react"
import styled from "styled-components"
import background from "./background.jpg"
import { Link, Redirect } from "react-router-dom"
import { generateListName } from "../../components/Backend/backend"

const Container = styled.main`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
    url(${background}) no-repeat 50% fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`

const Heading = styled.h1`
  color: white;
  font-size: 75px;
  text-align: center;
  line-height: 1.5;
`

const CTA = styled(Link)`
  color: white;
  text-decoration: none;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 30px;
  padding: 30px;
`

const App = props => {
  const [listName, setListName] = useState()

  useEffect(() => {
    setListName(window.localStorage.getItem("listName"))
  }, [])

  return (
    <Container>
      <Heading>Shopping List</Heading>
      <CTA to={`/list/${generateListName()}`}>Get Started</CTA>
      {listName && <Redirect to={`/list/${listName}`} />}
    </Container>
  )
}

export default App
