import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMemberComponent } from './card-member.component';

describe('CardMemberComponent', () => {
  let component: CardMemberComponent;
  let fixture: ComponentFixture<CardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
