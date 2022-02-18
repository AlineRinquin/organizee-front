import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHumeurComponent } from './page-humeur.component';

describe('PageHumeurComponent', () => {
  let component: PageHumeurComponent;
  let fixture: ComponentFixture<PageHumeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHumeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHumeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
