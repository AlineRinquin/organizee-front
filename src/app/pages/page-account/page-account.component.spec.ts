import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccountComponent } from './page-account.component';

describe('PageAccountComponent', () => {
  let component: PageAccountComponent;
  let fixture: ComponentFixture<PageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
