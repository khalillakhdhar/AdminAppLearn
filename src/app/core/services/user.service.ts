
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewUser(record) {
    return this.firestore.collection('Users').add(record);
  }

  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  read_clients() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "==", "client"))
    .snapshotChanges();
  }
  read_admins() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "==", "admin"))
    .snapshotChanges();
  }
  read_current(email) {
    return this.firestore.collection("Users", (ref) => ref.where("email", "==", email))
    .snapshotChanges();
  }
  read_effectifs() {
    return this.firestore.collection("Users", (ref) => ref.where("grade", "!=", "client"))
    .snapshotChanges();
  }
  update_User(recordID, record) {
    this.firestore.doc('Users/' + recordID).update(record);
    console.log('updated');
  }

  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
}
