import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageModifierContactComponent } from './page-modifier-contact.component';

describe('PageModifierContactComponent', () => {
  let component: PageModifierContactComponent;
  let fixture: ComponentFixture<PageModifierContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageModifierContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageModifierContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
