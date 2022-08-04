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
  currentFbrtdbObject?: FbrtdbObject;
  currentIndex = -1;
  title = '';

  constructor(private firestoreRtdbService: FirestoreRtdbService) { }

  ngOnInit(): void {
    this.retrieveFbrtdbObject();
  }

  refreshList(): void {
    this.currentFbrtdbObject = undefined;
    this.currentIndex = -1;
    this.retrieveFbrtdbObject();
  }
  retrieveFbrtdbObject(): void {
    this.firestoreRtdbService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.fbrtdbObjects = data;
    });
  }
  setActiveTutorial(fbrtdbObject: FbrtdbObject, index: number): void {
    this.currentFbrtdbObject = fbrtdbObject;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.firestoreRtdbService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
