import { Component, OnInit } from '@angular/core';
import { FbrtdbObject } from 'src/app/interface/fbrtdb.model';
import { FirestoreRtdbService } from 'src/app/services/firestore-rtdb.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  fbrtdbObjects?: FbrtdbObject[];
  fbrtdbRootObjects?: any[];
  currentFbrtdbObject?: FbrtdbObject;
  currentIndex = -1;
  title = '';
  foods: any[] = [
    { value: '/test', viewValue: 'Test' },
    { value: '/tutorials', viewValue: 'Tutorial' },
    { value: '/rootList', viewValue: 'lists' },
  ];

  constructor(private firestoreRtdbService: FirestoreRtdbService) { }

  ngOnInit(): void {
    this.retrieveFbrtdbObject();
    this.retrieveFbrtdbRootObject();
  }

  refreshList(): void {
    this.currentFbrtdbObject = undefined;
    this.currentIndex = -1;
    this.retrieveFbrtdbObject();
  }

  retrieveFbrtdbObject(): void {
    this.firestoreRtdbService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(data => {
        this.fbrtdbObjects = data;
      });
  }

  // select viewing object
  setActiveObject(fbrtdbObject: FbrtdbObject, index: number): void {
    this.currentFbrtdbObject = fbrtdbObject;
    this.currentIndex = index;
  }

  removeAllObjects(): void {
    this.firestoreRtdbService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  // select list
  select(input: string) {
    console.log(input);
    this.firestoreRtdbService.getDbRef(input);
    this.refreshList();
  }
  // get root node
  retrieveFbrtdbRootObject(): void {
    this.firestoreRtdbService.getRootAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(data => {
        this.fbrtdbRootObjects = data;
      });
    console.log(this.fbrtdbRootObjects);
  }
  // add rootList
  createList(ipnut:string):void{
    this.firestoreRtdbService.pushRootList(ipnut);
  }

}
