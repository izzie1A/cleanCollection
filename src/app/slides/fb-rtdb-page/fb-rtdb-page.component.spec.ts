import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbRtdbPageComponent } from './fb-rtdb-page.component';

describe('FbRtdbPageComponent', () => {
  let component: FbRtdbPageComponent;
  let fixture: ComponentFixture<FbRtdbPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbRtdbPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbRtdbPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
