import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FbrtdbObject } from '../interface/fbrtdb.model'
@Injectable({
  providedIn: 'root'
})
export class FirestoreRtdbService {
  public dbPath = '/rootList'+'/tutorials';
  private dbRefRootListPath = '/rootList';
  dbRef: AngularFireList<FbrtdbObject>;
  dbRefRootList: AngularFireList<FbrtdbObject>;
  
  constructor(private db: AngularFireDatabase) {
    this.dbRef = db.list(this.dbPath);
    this.dbRefRootList = db.list(this.dbRefRootListPath);
  }

  getRootAll(): AngularFireList<FbrtdbObject> {
    return this.dbRefRootList;
  }
  getAll(): AngularFireList<FbrtdbObject> {
    return this.dbRef;
  }
  create(tutorial: FbrtdbObject): any {
    return this.dbRef.push(tutorial);
  }
  pushRootList(value: any): any {
    return this.dbRefRootList.push(value);
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
  getDbRef(input:string){
    this.dbPath = this.dbRefRootListPath+'/'+input;
    this.dbRef = this.db.list(this.dbPath);
    console.log(this.dbRef);
  }
}