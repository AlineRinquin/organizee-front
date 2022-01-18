import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumeurComponent } from './humeur.component';

describe('HumeurComponent', () => {
  let component: HumeurComponent;
  let fixture: ComponentFixture<HumeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
