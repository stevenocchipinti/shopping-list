import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import Snackbar from "@material-ui/core/Snackbar"
import FloatingActionButton from "@material-ui/core/Fab"
import ContentAddIcon from "@material-ui/icons/Add"

import Backend from "../backend"
import AppBar from "./AppBar"
import ShoppingLists from "./ShoppingLists"
import AddItemDialog from "./AddItemDialog"
import EditItemDialog from "./EditItemDialog"

const FAB = styled(FloatingActionButton)`
  && {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
`

const App = props => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(!navigator.onLine)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState()
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  })

  useEffect(() => {
    window.addEventListener("online", () => {
      setNotification({ message: "You are now online!", visible: true })
      setOffline(false)
    })
    window.addEventListener("offline", () => {
      setNotification({ message: "You have been disconnected", visible: true })
      setOffline(true)
    })
    window.localStorage.setItem("listName", props.match.params.listId)

    backend.current = new Backend(props.match.params.listId, {
      onItemsChanged: items => {
        setItems(items)
        setLoading(false)
      },
      onCatalogueChanged: catalogue => {
        setCatalogue(catalogue)
        setLoading(false)
      },
    })
  }, [props.match.params.listId])

  const handleEdit = item => {
    setItemToEdit(item)
    setEditDialogOpen(true)
  }

  // handleEdit={item => backend.current.handleEdit(item)}
  return (
    <div>
      <AppBar
        sweepItems={() => backend.current.handleSweep()}
        loading={loading}
        offline={offline}
      />

      <ShoppingLists
        items={items}
        catalogue={catalogue}
        onMark={item => backend.current.handleMark(item)}
        onEdit={handleEdit}
        loading={loading}
      />

      <FAB onClick={() => setAddDialogOpen(true)} color="primary" tabIndex={1}>
        <ContentAddIcon />
      </FAB>

      <AddItemDialog
        open={addDialogOpen}
        onSubmit={entry => backend.current.handleAdd(entry)}
        onClose={() => setAddDialogOpen(false)}
        items={items}
        catalogue={catalogue}
      />

      <EditItemDialog
        open={editDialogOpen}
        item={itemToEdit}
        onSubmit={entry => backend.current.handleEdit(entry)}
        onClose={() => setAddDialogOpen(false)}
        items={items}
        catalogue={catalogue}
      />

      <Snackbar
        open={notification.visible}
        message={notification.message}
        autoHideDuration={3000}
        onClose={() => setNotification({ message: "", visible: false })}
      />
    </div>
  )
}
export default App
