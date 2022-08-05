import { Component, OnInit } from '@angular/core';
import { FirestoreRtdbService } from 'src/app/services/firestore-rtdb.service';
@Component({
  selector: 'app-fb-rtdb-page',
  templateUrl: './fb-rtdb-page.component.html',
  styleUrls: ['./fb-rtdb-page.component.css']
})
export class FbRtdbPageComponent implements OnInit {
  panelOpenState = false;

    sign?:any;
  constructor(private firestoreRtdbService: FirestoreRtdbService) {
    this.sign=firestoreRtdbService.dbPath;
   }

  ngOnInit(): void {
  }
  
  select(){
  }

}
