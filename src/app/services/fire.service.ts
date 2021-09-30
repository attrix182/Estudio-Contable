import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  public fotoCargada: any;
  public foto: any;

  constructor(private cloudFireStore: AngularFirestore,
    private storage: AngularFireStorage, private imageCompress: NgxImageCompressService) { }
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
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

  Delete(collectionName: string, id: string) {
    return this.cloudFireStore.collection(collectionName).doc(id).delete();
  }


  InsertPost(collectionName: string, post: any) {

    post.id = this.cloudFireStore.createId();

    if (post.img) {
      const filePath = `/usuarios/${post.id}/image.jpeg`;
      const ref = this.storage.ref(filePath).putString(post.img, 'base64', { contentType: 'image/jpeg' }).then(() => {
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

  UpdatePost(id: string, collectionName: string, post: any) {

  return this.cloudFireStore.collection(collectionName).doc(id).update({titulo: post.titulo, subtitulo: post.subtitulo, contenido: post.contenido});

}
/*     if (post.img) {
      const filePath = `/usuarios/${post.id}/image.jpeg`;
      const ref = this.storage.ref(filePath).putString(post.img, 'base64', { contentType: 'image/jpeg' }).then(() => {
        let storages = firebase.default.storage();
        let storageRef = storages.ref();
        let spaceRef = storageRef.child(filePath);

        spaceRef.getDownloadURL().then((url) => {
          this.fotoCargada = url;
          this.fotoCargada = `${this.fotoCargada}`;

          post.img = this.fotoCargada;

          return this.cloudFireStore.collection(collectionName).doc(id).update({ ...post });

        });
      });

    }
    else {
      return this.cloudFireStore.collection(collectionName).doc(id).update({titulo: post.titulo, subtitulo: post.subtitulo, contenido: post.contenido});
    }
    return 0;
  } */

  


}



