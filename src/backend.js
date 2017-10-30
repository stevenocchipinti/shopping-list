import Firebase from 'firebase'
import 'firebase/firestore'

// function mapFirebaseCheckins(checkins) {
//   if (!checkins) return [];
//   return Object.keys(checkins).reverse().map(k => {
//     return {
//       key: k,
//       date: checkins[k].createdAt,
//       weight: checkins[k].weight,
//       fat: checkins[k].fat,
//       waist: checkins[k].waist
//     };
//   })
// }


const backend = {
  init: (callbacks) => {
    const list = backend.listRef()

    list.collection("items").onSnapshot(querySnapshot => {
      callbacks.onItemsChanged(querySnapshot.docs.map(d => d.data()));
    });

    list.collection("catalogue").onSnapshot(querySnapshot => {
      callbacks.onCatalogueChanged(querySnapshot.docs.map(d => d.data()));
    });
  },

  listRef: () => {
    // TODO: Get from the URL instead of hardcoding
    return Firebase.firestore().collection(`lists`).doc("me");
  },

  handleAdd: (itemName, catalogueEntry) => {
    this.setState(
      {
        items: [...this.state.items, { label: itemName, done: false }],
        catalogue: { ...this.state.catalogue, ...catalogueEntry }
      },
      () => this.notify("New Item Added!")
    );
  },

  handleMove: (catalogueEntry) => {
    this.setState(
      {
        catalogue: { ...this.state.catalogue, ...catalogueEntry }
      },
      () => this.notify("Item Moved!")
    );
  },

  handleUncheck: (itemName) => {
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
  },

  handleMark: (item) => {
    const index = this.state.items.findIndex(i => i.label === item.label);
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        { ...item, done: !item.done },
        ...this.state.items.slice(index + 1)
      ]
    });
  },

  handleSweep: () => {
    this.setState({
      items: this.state.items.filter(i => !i.done)
    });
  },

  handleSubmit: (entry) => {
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

export default backend;
