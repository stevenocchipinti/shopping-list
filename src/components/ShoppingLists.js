import React from "react"
import styled from "styled-components"

import Chip from "./Chip"
import { slugify } from "../helpers"

import Paper from "@material-ui/core/Paper"

const Container = styled.div`
  margin-bottom: 100px;
  margin: 0 auto;
  max-width: 1000px;
`

const Card = styled(Paper)`
  margin: 10px;
  padding: 10px;
`

const Placeholder = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin: 10px;
  padding: 10px;
  && {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SectionTitle = styled.h2`
  font-size: 16px;
  margin: 0 0 10px;
  font-weight: normal;
`

const ShoppingLists = ({ handleMark, items, catalogue, loading }) => {
  const renderItemsFor = section => {
    const notDone = section.filter(i => !i.done).sort()
    const done = section.filter(i => i.done).sort()
    return notDone.concat(done).map((item, index) => {
      return (
        <Chip
          key={index}
          onClick={() => handleMark(item)}
          qty={item.quantity}
          done={item.done}
        >
          {item.name}
        </Chip>
      )
    })
  }

  const data = items.reduce((a, item) => {
    const catalogueEntry = catalogue[slugify(item.name)]
    const section = catalogueEntry ? catalogueEntry.section : ""
    if (Array.isArray(a[section])) {
      a[section].push(item)
    } else {
      a[section] = [item]
    }
    return a
  }, {})

  const notDone = Object.keys(data)
    .filter(section => data[section].some(item => !item.done))
    .sort()
  const done = Object.keys(data)
    .filter(section => data[section].every(item => item.done))
    .sort()

  const sections = [...notDone, ...done]

  return (
    <Container>
      {sections.map((section, index) => (
        <Card key={index}>
          {section && <SectionTitle>{section}</SectionTitle>}
          <Items>{renderItemsFor(data[section])}</Items>
        </Card>
      ))}

      {!loading && sections.length === 0 && (
        <Placeholder>No items yet</Placeholder>
      )}
    </Container>
  )
}

export default ShoppingLists
