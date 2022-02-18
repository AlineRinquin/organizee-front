import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteAccountComponent } from './page-delete-account.component';

describe('PageDeleteAccountComponent', () => {
  let component: PageDeleteAccountComponent;
  let fixture: ComponentFixture<PageDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDeleteAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
