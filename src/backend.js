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

    this.listRef = Firebase.firestore().collection("lists").doc(listName)
    this.itemsRef = this.listRef.collection("items")
    this.catalogueRef = this.listRef.collection("catalogue")

    this.unsubFunctions.push(
      this.catalogueRef.onSnapshot(
        { includeMetadataChanges: true },
        querySnapshot => {
          const catalogue = querySnapshot.docs.reduce((a, d) => {
            a[d.id] = d.data()
            return a
          }, {})
          this.catalogue = catalogue
          this.callbacks.onCatalogueChanged(catalogue)
        }
      )
    )

    this.unsubFunctions.push(
      this.itemsRef.onSnapshot(
        { includeMetadataChanges: true },
        querySnapshot => {
          const items = querySnapshot.docs.map(d => d.data())
          this.items = items
          this.callbacks.onItemsChanged(items)
        }
      )
    )
  }

  disconnect() {
    this.unsubFunctions.forEach(unsub => unsub())
    this.unsubFunctions = []
  }

  handleAdd({ item, section, quantity = 1 }) {
    const slug = slugify(item)
    const batch = Firebase.firestore().batch()
    batch.set(this.itemsRef.doc(slug), { name: item, quantity, done: false })
    batch.set(this.catalogueRef.doc(slug), { section })
    batch.commit()
  }

  handleEdit({ item, newItem, newSection, newQuantity = 1 }) {
    const existingSlug = slugify(item)
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
    batch.commit()
  }

  handleMark(item) {
    const slug = slugify(item.name)
    this.itemsRef.doc(slug).update({ done: !item.done })
  }

  handleSweep() {
    const batch = Firebase.firestore().batch()
    this.items
      .filter(item => item.done)
      .forEach(item => {
        batch.delete(this.itemsRef.doc(slugify(item.name)))
      })
    batch.commit()
  }
}
