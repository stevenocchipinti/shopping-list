import Firebase from 'firebase'
import 'firebase/firestore'
import slugify from './helpers/slugify';

export default class Backend {
  constructor(callbacks) {
    // TODO: Get from the URL instead of hardcoding
    this.listRef = Firebase.firestore().collection(`lists`).doc("me");
    this.itemsRef = this.listRef.collection("items");
    this.catalogueRef = this.listRef.collection("catalogue");

    this.itemsRef.onSnapshot(querySnapshot => {
      callbacks.onItemsChanged(querySnapshot.docs.map(d => d.data()));
    });

    this.catalogueRef.onSnapshot(querySnapshot => {
      callbacks.onCatalogueChanged(
        querySnapshot.docs.reduce((a,d) => {
          a[d.id] = d.data().section;
          return a;
        }, {})
      );
    });
  }

  handleAdd(itemName, section) {
    const slug = slugify(itemName);
    const batch = Firebase.firestore().batch();
    batch.set(this.itemsRef.doc(slug), { name: itemName, done: false });
    batch.set(this.catalogueRef.doc(slug), { section });
    batch.commit();
  }

  handleMove(catalogueEntry) {
    this.setState(
      { catalogue: { ...this.state.catalogue, ...catalogueEntry } },
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

  handleMark(itemName) {
    const slug = slugify(itemName);
    const ref = this.itemsRef.doc(slug);
    Firebase.firestore().runTransaction(transaction => {
      return transaction.get(ref).then(doc => {
        transaction.update(ref, { done: !doc.data().done });
      })
    })
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
