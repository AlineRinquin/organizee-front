import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAjoutEvenementsComponent } from './page-ajout-evenements.component';

describe('PageAjoutEvenementsComponent', () => {
  let component: PageAjoutEvenementsComponent;
  let fixture: ComponentFixture<PageAjoutEvenementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAjoutEvenementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAjoutEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
