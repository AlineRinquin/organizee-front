import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMenuSemaineComponent } from './page-menu-semaine.component';

describe('PageMenuSemaineComponent', () => {
  let component: PageMenuSemaineComponent;
  let fixture: ComponentFixture<PageMenuSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMenuSemaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMenuSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
