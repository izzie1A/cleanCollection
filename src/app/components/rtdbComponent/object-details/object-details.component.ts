import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FbrtdbObject } from 'src/app/interface/fbrtdb.model';
import { FirestoreRtdbService } from 'src/app/services/firestore-rtdb.service';
@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {

  @Input() fbrtdbObject?: FbrtdbObject;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentFbrtdbObject: FbrtdbObject = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private firestoreRtdbService: FirestoreRtdbService) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentFbrtdbObject = { ...this.fbrtdbObject };
  }
  updatePublished(status: boolean): void {
    if (this.currentFbrtdbObject.key) {
      this.firestoreRtdbService.update(this.currentFbrtdbObject.key, { published: status })
      .then(() => {
        this.currentFbrtdbObject.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }
  updateFbrtdbObject(): void {
    const data = {
      title: this.currentFbrtdbObject.title,
      description: this.currentFbrtdbObject.description
    };
    if (this.currentFbrtdbObject.key) {
      this.firestoreRtdbService.update(this.currentFbrtdbObject.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }
  deleteFbrtdbObject(): void {
    if (this.currentFbrtdbObject.key) {
      this.firestoreRtdbService.delete(this.currentFbrtdbObject.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}