import { reducer, defaultState } from "./useDialogState"

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

    it("has a disabled 'Add' button", () => {
      expect(defaultState).toHaveProperty("actionLabel", "Add")
      expect(defaultState).toHaveProperty("actionDisabled", true)
    })
  })

  describe("reset state", () => {
    it("resets to the defaultState", () => {
      const resetState = reducer(defaultState, { type: "reset" })
      expect(resetState).toEqual(defaultState)
    })
  })

  describe("entering a new item", () => {
    describe("that has never been entered before", () => {
      const newItemState = reducer(defaultState, {
        type: "item",
        items,
        catalogue,
        newItem: "Bananas",
      })

      it("leaves the section field blank", () => {
        expect(newItemState).toHaveProperty("section", "")
      })

      it("leaves the quantity field set to 1", () => {
        expect(newItemState).toHaveProperty("quantity", 1)
      })

      it("shows an enabled 'Add' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Add")
        expect(newItemState).toHaveProperty("actionDisabled", false)
      })

      describe("then changing the section to new section", () => {
        const newSectionState = reducer(newItemState, {
          type: "section",
          items,
          catalogue,
          newSection: "New Section",
        })

        it("shows an enabled 'Add' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Add")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })

      describe("then changing the quantity", () => {
        const newSectionState = reducer(newItemState, {
          type: "quantity",
          items,
          catalogue,
          newQuantity: 9,
        })

        it("shows an enabled 'Add' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Add")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })
    })

    describe("that has been entered before", () => {
      const newItemState = reducer(defaultState, {
        type: "item",
        items,
        catalogue,
        newItem: "Asparagus",
      })

      it("fills the section from the catalogue", () => {
        expect(newItemState).toHaveProperty("section", "Fresh Produce")
      })

      it("leaves the quantity field set to 1", () => {
        expect(newItemState).toHaveProperty("quantity", 1)
      })

      it("shows an enabled 'Add' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Add")
        expect(newItemState).toHaveProperty("actionDisabled", false)
      })

      describe("then changing the section to new section", () => {
        const newSectionState = reducer(newItemState, {
          type: "section",
          items,
          catalogue,
          newSection: "New Section",
        })

        it("shows an enabled 'Add' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Add")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })

      describe("then changing the quantity", () => {
        const newSectionState = reducer(newItemState, {
          type: "quantity",
          items,
          catalogue,
          newQuantity: 9,
        })

        it("shows an enabled 'Add' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Add")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })
    })
  })

  describe("entering a existing item", () => {
    describe("that is not done", () => {
      const newItemState = reducer(defaultState, {
        type: "item",
        items,
        catalogue,
        newItem: "Apples",
      })

      it("fills the section from the catalogue", () => {
        expect(newItemState).toHaveProperty("section", "Fresh Produce")
      })

      it("leaves the quantity field set to 1", () => {
        expect(newItemState).toHaveProperty("quantity", 1)
      })

      it("shows an disabled 'Already exists!' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Already exists!")
        expect(newItemState).toHaveProperty("actionDisabled", true)
      })

      describe("then changing the section to new section", () => {
        const newSectionState = reducer(newItemState, {
          type: "section",
          items,
          catalogue,
          newSection: "New Section",
        })

        it("shows an enabled 'Move' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Move")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })

      describe("then changing the quantity", () => {
        const newSectionState = reducer(newItemState, {
          type: "quantity",
          items,
          catalogue,
          newQuantity: 9,
        })

        it("shows an enabled 'Update' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Update")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })
    })

    describe("that is done", () => {
      const newItemState = reducer(defaultState, {
        type: "item",
        items,
        catalogue,
        newItem: "Almond Flour",
      })

      it("fills the section from the catalogue", () => {
        expect(newItemState).toHaveProperty("section", "Health Food")
      })

      it("leaves the quantity field set to 1", () => {
        expect(newItemState).toHaveProperty("quantity", 1)
      })

      it("shows an enabled 'Uncheck' button", () => {
        expect(newItemState).toHaveProperty("actionLabel", "Uncheck")
        expect(newItemState).toHaveProperty("actionDisabled", false)
      })

      describe("then changing the section to new section", () => {
        const newSectionState = reducer(newItemState, {
          type: "section",
          items,
          catalogue,
          newSection: "New Section",
        })

        it("shows an enabled 'Move' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Move")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })

      describe("then changing the quantity", () => {
        const newSectionState = reducer(newItemState, {
          type: "quantity",
          items,
          catalogue,
          newQuantity: 9,
        })

        it("shows an enabled 'Update' button", () => {
          expect(newSectionState).toHaveProperty("actionLabel", "Update")
          expect(newSectionState).toHaveProperty("actionDisabled", false)
        })
      })
    })
  })
})
