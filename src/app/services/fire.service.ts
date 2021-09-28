import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  public fotoCargada: any;
  public foto: any;

  constructor(private cloudFireStore: AngularFirestore,
    private storage: AngularFireStorage) { }

  Insert(collectionName: string, data: any) {
    const id = this.cloudFireStore.createId();
    data.id = id;
    return this.cloudFireStore.collection(collectionName).doc(data.id).set(data);
  }

  ReturnFirestore() {
    return this.cloudFireStore
  }

  InsertCustomID(collectionName: string, idCustom: any, data: any) {
    return this.cloudFireStore.collection(collectionName).doc(idCustom).set(data);
  }

  GetAll(collectionName: string) {
    return this.cloudFireStore.collection(collectionName).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data: any = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        }))
    );
  }
  GetByParameter(collection: string, parametro: string, value: any) {
    return this.cloudFireStore.collection<any>(collection, ref => ref.where(parametro, '==', value));
  }

  Update(id: string, collectionName: string, data: any) {
    return this.cloudFireStore.collection(collectionName).doc(id).update({ ...data });
  }


  InsertPost(collectionName: string, post: any) {

    post.id = this.cloudFireStore.createId();

    if (post.img) {
      const filePath = `/usuarios/${post.id}/1.png`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, post.img).then(() => {

        let storages = firebase.default.storage();
        let storageRef = storages.ref();
        let spaceRef = storageRef.child(filePath);

        spaceRef.getDownloadURL().then((url) => {
          this.fotoCargada = url;
          this.fotoCargada = `${this.fotoCargada}`;

          post.img = this.fotoCargada;

          return this.cloudFireStore.collection(collectionName).doc(post.id).set(post);

        });
      });
    }
  }
}



