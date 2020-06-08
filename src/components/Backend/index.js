import React, { useEffect, useState, useRef, createContext } from "react"
import Backend from "./backend"

const AppContext = createContext()
const BackendContext = createContext()

const AppProvider = ({ listId, children }) => {
  const backend = useRef()

  const [items, setItems] = useState([])
  const [catalogue, setCatalogue] = useState({})
  const [planner, setPlanner] = useState({})
  const [recipes, setRecipes] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.localStorage.setItem("listName", listId)
    backend.current = new Backend(listId, {
      onItemsChanged: items => setItems(items),
      onCatalogueChanged: catalogue => setCatalogue(catalogue),
      onPlannerChanged: planner => setPlanner(planner),
      onRecipesChanged: recipes => setRecipes(recipes),
      onLoadingChanged: loading => setLoading(loading),
    })
    return () => backend.current.disconnect()
  }, [listId])

  return (
    <AppContext.Provider
      value={{ items, catalogue, planner, recipes, loading }}
    >
      <BackendContext.Provider value={backend.current?.actions()}>
        {children}
      </BackendContext.Provider>
    </AppContext.Provider>
  )
}

const useAppState = () => React.useContext(AppContext)
const useBackend = () => React.useContext(BackendContext)

export { AppProvider, useAppState, useBackend }
