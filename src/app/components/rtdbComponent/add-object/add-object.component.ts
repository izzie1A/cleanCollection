import { Component, OnInit } from '@angular/core';
import { FbrtdbObject } from 'src/app/interface/fbrtdb.model';
import { FirestoreRtdbService } from 'src/app/services/firestore-rtdb.service';
@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {
  fbrtdbObject: FbrtdbObject = new FbrtdbObject();
  submitted = false;

  constructor(private firestoreRtdbService: FirestoreRtdbService) {
   }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.firestoreRtdbService.create(this.fbrtdbObject).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.fbrtdbObject = new FbrtdbObject();
  }

}
