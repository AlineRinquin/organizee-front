import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteMemberComponent } from './page-delete-member.component';

describe('PageDeleteMemberComponent', () => {
  let component: PageDeleteMemberComponent;
  let fixture: ComponentFixture<PageDeleteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDeleteMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeleteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
