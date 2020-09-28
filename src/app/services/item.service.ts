import { IItem } from './../models/IItem';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
  from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<IItem>;
  items: Observable<IItem[]>;

  constructor(private fs: AngularFirestore) { 
    this.itemsCollection = this.fs.collection('items', ref => ref.orderBy('title', 'asc'));

    this.items = this.itemsCollection.snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(a => {
            const data = a.payload.doc.data() as IItem;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      )
  }

  getItems() {
    return this.items;
  }

  addItem(item: IItem) {
    this.itemsCollection.add(item);
  }

  deleteItem(itemId: string) {
    this.itemsCollection.doc(itemId).delete().then();
  }

  updateItem(item: IItem) {
    const itemId = item.id;
    delete item.id;
    this.itemsCollection.doc(itemId).update(item).then();
  }
}