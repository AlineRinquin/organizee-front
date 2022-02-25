import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUpdateAccountComponent } from './page-update-account.component';

describe('PageUpdateAccountComponent', () => {
  let component: PageUpdateAccountComponent;
  let fixture: ComponentFixture<PageUpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUpdateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
