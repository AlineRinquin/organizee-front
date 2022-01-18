import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageToDoListComponent } from './page-to-do-list.component';

describe('PageToDoListComponent', () => {
  let component: PageToDoListComponent;
  let fixture: ComponentFixture<PageToDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageToDoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
