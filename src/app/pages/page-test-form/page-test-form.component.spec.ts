import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTestFormComponent } from './page-test-form.component';

describe('PageTestFormComponent', () => {
  let component: PageTestFormComponent;
  let fixture: ComponentFixture<PageTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
