import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FbrtdbObject } from '../interface/fbrtdb.model'
@Injectable({
  providedIn: 'root'
})
export class FirestoreRtdbService {
  private dbPath = '/tutorials';
  dbRef: AngularFireList<FbrtdbObject>;
  
  constructor(private db: AngularFireDatabase) {
    this.dbRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<FbrtdbObject> {
    return this.dbRef;
  }
  create(tutorial: FbrtdbObject): any {
    return this.dbRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.dbRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.dbRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.dbRef.remove();
  }
  getDbRef(input:string): AngularFireList<FbrtdbObject> {
    this.dbPath = input;
    this.dbRef = this.db.list(this.dbPath);
    return this.dbRef;
  }
}