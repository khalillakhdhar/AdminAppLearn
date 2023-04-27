
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewMatiere(record) {
    return this.firestore.collection('Matieres').add(record);
  }

  read_Matieres() {
    return this.firestore.collection('Matieres').snapshotChanges();
  }


  update_Matiere(recordID, record) {
    this.firestore.doc('Matieres/' + recordID).update(record);
    console.log('updated');
  }

  delete_Matiere(record_id) {
    this.firestore.doc('Matieres/' + record_id).delete();
  }
}
