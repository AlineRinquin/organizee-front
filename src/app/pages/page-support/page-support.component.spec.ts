import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSupportComponent } from './page-support.component';

describe('PageSupportComponent', () => {
  let component: PageSupportComponent;
  let fixture: ComponentFixture<PageSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
