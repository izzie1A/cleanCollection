import { TestBed } from '@angular/core/testing';

import { FirestoreRtdbService } from './firestore-rtdb.service';

describe('FirestoreRtdbService', () => {
  let service: FirestoreRtdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreRtdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
