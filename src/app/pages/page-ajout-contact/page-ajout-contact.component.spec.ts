import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAjoutContactComponent } from './page-ajout-contact.component';

describe('PageAjoutContactComponent', () => {
  let component: PageAjoutContactComponent;
  let fixture: ComponentFixture<PageAjoutContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAjoutContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAjoutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
