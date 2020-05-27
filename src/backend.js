import * as Firebase from "firebase/app"
import "firebase/firestore"
import { slugify } from "./helpers"

export function generateListName() {
  return Firebase.firestore().collection("lists").doc().id
}

export default class Backend {
  constructor(listName, callbacks) {
    this.unsubFunctions = []
    this.callbacks = callbacks

    this.connectToList(listName)
  }

  connectToList(listName) {
    this.disconnect()

    this.items = []
    this.catalogue = {}
    this.planner = {}

    this.listRef = Firebase.firestore().collection("lists").doc(listName)
    this.itemsRef = this.listRef.collection("items")
    this.catalogueRef = this.listRef.collection("catalogue")
    this.plannerRef = this.listRef.collection("planner")

    this.setLoading()

    this.unsubFunctions.push(
      this.catalogueRef.onSnapshot(
        { includeMetadataChanges: true },
        querySnapshot => {
          this.catalogue = querySnapshot.docs.reduce(
            (a, doc) => ({ ...a, [doc.id]: doc.data() }),
            {}
          )
          this.callbacks.onCatalogueChanged(this.catalogue)
          this.setDone()
        }
      )
    )

    this.unsubFunctions.push(
      this.itemsRef.onSnapshot(
        { includeMetadataChanges: true },
        querySnapshot => {
          this.items = querySnapshot.docs.map(d => d.data())
          this.callbacks.onItemsChanged(this.items)
          this.setDone()
        }
      )
    )

    this.unsubFunctions.push(
      this.plannerRef.onSnapshot(
        { includeMetadataChanges: true },
        querySnapshot => {
          this.planner = querySnapshot.docs.reduce(
            (a, doc) => ({ ...a, [doc.id]: doc.data() }),
            {}
          )
          this.callbacks.onPlannerChanged(this.planner)
          this.setDone()
        }
      )
    )
  }

  disconnect() {
    this.unsubFunctions.forEach(unsub => unsub())
    this.unsubFunctions = []
  }

  setLoading() {
    this.callbacks.onLoadingChanged(true)
  }

  setDone() {
    this.callbacks.onLoadingChanged(false)
  }

  handleAdd({ item, section, quantity = 1 }) {
    this.setLoading()
    const slug = slugify(item)
    const batch = Firebase.firestore().batch()
    batch.set(this.itemsRef.doc(slug), { name: item, quantity, done: false })
    batch.set(this.catalogueRef.doc(slug), { section })
    batch.commit().then(() => this.setDone())
  }

  handleEdit({ item, newItem, newSection, newQuantity = 1 }) {
    this.setLoading()
    const existingSlug = slugify(item.name)
    const newSlug = slugify(newItem)
    const batch = Firebase.firestore().batch()
    // Delete first
    batch.delete(this.itemsRef.doc(existingSlug))
    // Add item
    batch.set(this.itemsRef.doc(newSlug), {
      name: newItem,
      quantity: newQuantity,
      done: false,
    })
    batch.set(this.catalogueRef.doc(newSlug), { section: newSection })
    batch.commit().then(() => this.setDone())
  }

  handleMark(item) {
    this.setLoading()
    const slug = slugify(item.name)
    this.itemsRef
      .doc(slug)
      .update({ done: !item.done })
      .then(() => this.setDone())
  }

  handleCatalogueDelete(item) {
    this.setLoading()
    this.catalogueRef
      .doc(item)
      .delete()
      .then(() => this.setDone())
  }

  handleSweep() {
    this.setLoading()
    const batch = Firebase.firestore().batch()
    this.items
      .filter(item => item.done)
      .forEach(item => {
        batch.delete(this.itemsRef.doc(slugify(item.name)))
      })
    batch.commit().then(() => this.setDone())
  }

  handleAddToPlanner({ item, day }) {
    this.setLoading()
    const plannedItems = this.planner?.[day]?.items || []
    this.plannerRef
      .doc(day)
      .set({ items: [...plannedItems, item] })
      .then(() => this.setDone())
  }

  handleClearPlanner() {
    this.setLoading()
    const batch = Firebase.firestore().batch()
    Object.keys(this.planner).forEach(day => {
      batch.delete(this.plannerRef.doc(day))
    })
    batch.commit().then(() => this.setDone())
  }

  handleAddPlanToList(items) {
    this.setLoading()
    const batch = Firebase.firestore().batch()
    items.forEach(({ name, section, quantity }) => {
      const slug = slugify(name)
      batch.set(this.itemsRef.doc(slug), { name, quantity, done: false })
      batch.set(this.catalogueRef.doc(slug), { section })
    })
    batch.commit().finally(() => this.setDone())
  }
}
