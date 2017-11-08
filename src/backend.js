import Firebase from 'firebase'
import 'firebase/firestore'
import slugify from './helpers/slugify';

export default class Backend {
  constructor(callbacks) {
    this.database = Firebase.firestore();
    Firebase.firestore().enablePersistence().then(() => {
      this.database = Firebase.firestore();
    });

    // TODO: Get from the URL instead of hardcoding
    this.listRef = Firebase.firestore().collection(`lists`).doc("me");
    this.itemsRef = this.listRef.collection("items");
    this.catalogueRef = this.listRef.collection("catalogue");

    this.items = [];
    this.catalogue = {};

    this.itemsRef.onSnapshot(
      { includeQueryMetadataChanges: true },
      querySnapshot => {
        const items = querySnapshot.docs.map(d => d.data());
        this.items = items;
        callbacks.onItemsChanged(items);
      }
    );

    this.catalogueRef.onSnapshot(
      { includeQueryMetadataChanges: true },
      querySnapshot => {
      const catalogue = querySnapshot.docs.reduce((a,d) => {
        a[d.id] = d.data().section;
        return a;
      }, {});
      this.catalogue = catalogue;
      callbacks.onCatalogueChanged(catalogue);
    });
  }

  handleAdd(itemName, section) {
    const slug = slugify(itemName);
    const batch = Firebase.firestore().batch();
    batch.set(this.itemsRef.doc(slug), { name: itemName, done: false });
    batch.set(this.catalogueRef.doc(slug), { section });
    batch.commit();
  }

  handleMark(item) {
    const slug = slugify(item.name);
    this.itemsRef.doc(slug).update({ done: !item.done });
  }

  handleSweep() {
    const batch = Firebase.firestore().batch();
    this.items.filter(item => item.done).forEach(item => {
      batch.delete(this.itemsRef.doc(slugify(item.name)));
    });
    batch.commit();
  }
};
