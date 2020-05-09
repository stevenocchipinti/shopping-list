import React, { useState, useEffect, useRef } from "react"

import Backend from "../backend"

import AppBar from "./AppBar"
import ShoppingLists from "./ShoppingLists"
import NewItemDialog from "./NewItemDialog"

import Snackbar from "@material-ui/core/Snackbar"

const App = props => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(!navigator.onLine)
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

  return (
    <div>
      <AppBar
        sweepItems={() => backend.current.handleSweep()}
        loading={loading}
        offline={offline}
      />

      <ShoppingLists
        handleMark={item => backend.current.handleMark(item)}
        items={items}
        catalogue={catalogue}
        onSubmit={entry => backend.current.handleAdd(entry)}
      />

      <NewItemDialog
        items={items}
        catalogue={catalogue}
        onSubmit={entry => backend.current.handleAdd(entry)}
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
