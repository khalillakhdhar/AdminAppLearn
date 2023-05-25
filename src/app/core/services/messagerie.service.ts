import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewMessage(record) {
    let id=localStorage.getItem("myid");
    return this.firestore.collection("/Messages").add(record);
  }

  read_Messages() {
    return this.firestore.collection("/Messages", ref => ref.orderBy('date'))
    .snapshotChanges();
    }
  read_myMessages() {
    // merge with hisMessages collection

    return this.firestore.collection("Messages", (ref) => ref.where("emetteur.id", "==", localStorage.getItem("myid")))
    .snapshotChanges().concat(this.read_hisMessages());
  }
  read_hisMessages() {
    return this.firestore.collection("Messages", (ref) => ref.where("recepteur.id", "==", localStorage.getItem("usid")))
    .snapshotChanges();
  }
  delete_Message(record_id) {

    this.firestore.doc('Messages/' + record_id).delete();
  }
}
