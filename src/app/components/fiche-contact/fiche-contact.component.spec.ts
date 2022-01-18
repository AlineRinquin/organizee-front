import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheContactComponent } from './fiche-contact.component';

describe('FicheContactComponent', () => {
  let component: FicheContactComponent;
  let fixture: ComponentFixture<FicheContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
