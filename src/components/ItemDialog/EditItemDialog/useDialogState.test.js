import { reducer, defaultState } from "./useDialogState"

const itemToEdit = {
  name: "Apples",
  quantity: 5,
  done: false,
}

const items = [
  { name: "Apples", qty: 5, done: false },
  { name: "Almond Flour", qty: 1, done: true },
]

const catalogue = {
  "aa-batteries": { section: "" },
  "almond-flour": { section: "Health Food" },
  apples: { section: "Fresh Produce" },
  asparagus: { section: "Fresh Produce" },
}

describe("reducer", () => {
  describe("default state", () => {
    it("has empty fields and quantity=1", () => {
      expect(defaultState).toHaveProperty("item", "")
      expect(defaultState).toHaveProperty("section", "")
      expect(defaultState).toHaveProperty("quantity", 1)
    })

    it("has a disabled 'Save' button", () => {
      expect(defaultState).toHaveProperty("actionLabel", "Save")
      expect(defaultState).toHaveProperty("actionDisabled", false)
    })
  })

  describe("setting up form to edit an item", () => {
    const newSetState = reducer(defaultState, {
      type: "set",
      item: itemToEdit,
      items,
      catalogue,
    })

    it("loads the items details into the form", () => {
      expect(newSetState).toHaveProperty("item", "Apples")
      expect(newSetState).toHaveProperty("section", "Fresh Produce")
      expect(newSetState).toHaveProperty("quantity", 5)
      expect(newSetState).toHaveProperty("actionLabel", "Save")
      expect(newSetState).toHaveProperty("actionDisabled", true)
    })

    describe("then changing the name to something new", () => {
      const newItemState = reducer(newSetState, {
        type: "item",
        newItem: "Something new",
        item: itemToEdit,
        items,
        catalogue,
      })

      it("updates the form", () => {
        expect(newItemState).toHaveProperty("item", "Something new")
        expect(newItemState).toHaveProperty("section", "Fresh Produce")
        expect(newItemState).toHaveProperty("quantity", 5)
      })

      it("shows an enabled 'Save' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Save")
        expect(newItemState).toHaveProperty("actionDisabled", false)
      })
    })

    describe("then changing the name to something that exists", () => {
      const newItemState = reducer(newSetState, {
        type: "item",
        newItem: "Almond Flour",
        item: itemToEdit,
        items,
        catalogue,
      })

      it("updates the form", () => {
        expect(newItemState).toHaveProperty("item", "Almond Flour")
        expect(newItemState).toHaveProperty("section", "Fresh Produce")
        expect(newItemState).toHaveProperty("quantity", 5)
      })

      it("shows an disabled 'Already exists!' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Already exists!")
        expect(newItemState).toHaveProperty("actionDisabled", true)
      })
    })

    describe("then changing the section to something new", () => {
      const newSectionState = reducer(newSetState, {
        type: "section",
        newSection: "Somewhere new",
        item: itemToEdit,
        items,
        catalogue,
      })

      it("updates the form", () => {
        expect(newSectionState).toHaveProperty("item", "Apples")
        expect(newSectionState).toHaveProperty("section", "Somewhere new")
        expect(newSectionState).toHaveProperty("quantity", 5)
      })

      it("shows an enabled 'Save' button", () => {
        expect(newSectionState).toHaveProperty("actionLabel", "Save")
        expect(newSectionState).toHaveProperty("actionDisabled", false)
      })
    })

    describe("then changing the quantity to something new", () => {
      const newItemState = reducer(newSetState, {
        type: "quantity",
        newQuantity: 99,
        item: itemToEdit,
        items,
        catalogue,
      })

      it("updates the form", () => {
        expect(newItemState).toHaveProperty("item", "Apples")
        expect(newItemState).toHaveProperty("section", "Fresh Produce")
        expect(newItemState).toHaveProperty("quantity", 99)
      })

      it("shows an enabled 'Save' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Save")
        expect(newItemState).toHaveProperty("actionDisabled", false)
      })
    })
  })
})
