import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddMemberComponent } from './page-add-member.component';

describe('PageAddMemberComponent', () => {
  let component: PageAddMemberComponent;
  let fixture: ComponentFixture<PageAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAddMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
