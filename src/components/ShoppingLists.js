import React, { useState } from "react"
import styled from "styled-components"

import Chip from "./Chip"
import { slugify } from "../helpers"
import { EditItemDialog } from "./Dialogs"
import { useAppState } from "./Backend"

import { Paper } from "@material-ui/core"

const Container = styled.div`
  padding: ${({ variant }) =>
    variant === "embedded" ? "0 0 100px" : "0 10px 100px"};
  margin: 0 auto;
  max-width: 1000px;
`

const Card = styled(Paper)`
  margin: 10px 0;
  padding: ${({ variant }) => (variant === "embedded" ? "0" : "10px")};
`

const Placeholder = styled(Paper).attrs({ elevation: 0, variant: "outlined" })`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin: 10px;
  padding: 3rem;
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

const ShoppingLists = ({
  onMark,
  onEdit,
  onDelete,
  items, // Not always from the AppState
  variant = "main",
}) => {
  const { catalogue, loading } = useAppState()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState()

  const handleEdit = item => {
    if (onEdit) {
      setItemToEdit(item)
      setEditDialogOpen(true)
    }
  }

  const renderItemsFor = section => {
    const notDone = section.filter(i => !i.done).sort()
    const done = section.filter(i => i.done).sort()
    return notDone.concat(done).map((item, index) => (
      <Chip
        key={index}
        onClick={() => onMark(item)}
        onLongPress={() => handleEdit(item)}
        qty={item.quantity}
        done={item.done}
        emoji={item.emoji}
      >
        {item.name}
      </Chip>
    ))
  }

  const itemsBySection = items.reduce((a, item) => {
    const catalogueEntry = catalogue[slugify(item.name)]
    const section = catalogueEntry?.section || ""
    return {
      ...a,
      [section]: [
        ...(a[section] || []),
        { ...item, emoji: catalogueEntry?.emoji },
      ],
    }
  }, {})

  const notDone = Object.keys(itemsBySection)
    .filter(section => itemsBySection[section].some(item => !item.done))
    .sort()
  const done = Object.keys(itemsBySection)
    .filter(section => itemsBySection[section].every(item => item.done))
    .sort()

  const sections = [...notDone, ...done]

  return (
    <>
      <Container variant={variant}>
        {sections.map((section, index) => (
          <Card
            variant={variant === "embedded" ? "outlined" : "elevation"}
            key={index}
          >
            {section && <SectionTitle>{section}</SectionTitle>}
            <Items>{renderItemsFor(itemsBySection[section])}</Items>
          </Card>
        ))}

        {!loading && sections.length === 0 && (
          <Placeholder>No items yet</Placeholder>
        )}
      </Container>

      <EditItemDialog
        item={itemToEdit}
        open={editDialogOpen}
        onSubmit={onEdit}
        onDelete={onDelete}
        onClose={() => setEditDialogOpen(false)}
        items={items}
        catalogue={catalogue}
      />
    </>
  )
}

export default ShoppingLists
