import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUpdateMemberComponent } from './page-update-member.component';

describe('PageUpdateMemberComponent', () => {
  let component: PageUpdateMemberComponent;
  let fixture: ComponentFixture<PageUpdateMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUpdateMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUpdateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
