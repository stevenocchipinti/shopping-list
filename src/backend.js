import { auth, database } from "firebase";

function mapFirebaseCheckins(checkins) {
  if (!checkins) return [];
  return Object.keys(checkins).reverse().map(k => {
    return {
      key: k,
      date: checkins[k].createdAt,
      weight: checkins[k].weight,
      fat: checkins[k].fat,
      waist: checkins[k].waist
    };
  }).sort(compareCheckins);
}

function compareCheckins(a, b, key="date") {
  if (a[key] < b[key]) return 1;
  if (a[key] > b[key]) return -1;
  return 0;
}

let allCallbacks = {};


const backend = {
  init: (callbacks) => {
    allCallbacks = callbacks;

    auth().onAuthStateChanged(user => {
      callbacks.onAuthStateChanged(user);

      if (!user) return;
      backend.checkinsRef().on("value", snapshot => {
        callbacks.onCheckinsChanged(mapFirebaseCheckins(snapshot.val()));
      });
    });
  },

  signIn: () => {
    let provider = new auth.GoogleAuthProvider();
    auth().signInWithRedirect(provider);
  },

  signOut: () => {
    auth().signOut();
    allCallbacks.onCheckinsChanged([]);
  },

  currentUser: () => {
    return auth().currentUser;
  },

  checkinsRef: () => {
    const user = backend.currentUser();
    return database().ref(`/checkins/${user.uid}`);
  },

  addCheckin: (checkin) => {
    if (!backend.currentUser()) return false;
    let newCheckinRef = backend.checkinsRef().push();
    return newCheckinRef.set({
      createdAt: checkin.date.toISOString(),
      weight: checkin.weight,
      fat: checkin.fat,
      waist: checkin.waist
    });
  },

  deleteCheckin: (checkinKey) => {
    if (!backend.currentUser()) return false;
    return backend.checkinsRef().child(checkinKey).remove();
  }
};

export default backend;
