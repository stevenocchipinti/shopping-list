import Firebase from 'firebase'
import 'firebase/firestore'

export default class Backend {
  constructor(callbacks) {
    // TODO: Get from the URL instead of hardcoding
    this.listRef = Firebase.firestore().collection(`lists`).doc("me");

    this.listRef.collection("items").onSnapshot(querySnapshot => {
      callbacks.onItemsChanged(querySnapshot.docs.map(d => d.data()));
    });

    this.listRef.collection("catalogue").onSnapshot(querySnapshot => {
      callbacks.onCatalogueChanged(
        querySnapshot.docs.reduce((a,d) => {
          const { item, section } = d.data();
          a[item] = section;
          return a;
        }, {})
      );
    });
  }

  handleAdd(itemName, catalogueEntry) {
    console.log("Adding", itemName, catalogueEntry);
    console.log(this.listRef.collection(`lists`).doc("me")
      .collection("items")
      .where("name", "==", "Apples").get()
      .then(d => console.log(d))
    )
  }

  handleMove(catalogueEntry) {
    this.setState(
      {
        catalogue: { ...this.state.catalogue, ...catalogueEntry }
      },
      () => this.notify("Item Moved!")
    );
  }

  handleUncheck(itemName) {
    const index = this.state.items.findIndex(i => i.label === itemName);
    this.setState(
      {
        items: [
          ...this.state.items.slice(0, index),
          { label: itemName, done: false },
          ...this.state.items.slice(index + 1)
        ]
      },
      () => this.notify("Item Unchecked!")
    );
  }

  handleMark(item) {
    const index = this.state.items.findIndex(i => i.label === item.label);
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        { ...item, done: !item.done },
        ...this.state.items.slice(index + 1)
      ]
    });
  }

  handleSweep() {
    this.setState({
      items: this.state.items.filter(i => !i.done)
    });
  }

  handleSubmit(entry) {
    let catalogueEntry = {};
    catalogueEntry[entry.item] = entry.section;

    const itemOnList = this.state.items.find(i => i.label === entry.item);
    const storedSection = this.state.catalogue[entry.item];

    if (itemOnList && storedSection !== entry.section) {
      this.handleMove(catalogueEntry);
    } else if (itemOnList && storedSection === entry.section) {
      this.handleUncheck(entry.item);
    } else {
      this.handleAdd(entry.item, catalogueEntry);
    }
  }

  // addCheckin: (checkin) => {
  //   if (!backend.currentUser()) return false;
  //   let newCheckinRef = backend.checkinsRef().push();
  //   return newCheckinRef.set({
  //     createdAt: checkin.date.toISOString(),
  //     weight: checkin.weight,
  //     fat: checkin.fat,
  //     waist: checkin.waist
  //   });
  // }
};
