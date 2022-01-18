import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRepertoireComponent } from './page-repertoire.component';

describe('PageRepertoireComponent', () => {
  let component: PageRepertoireComponent;
  let fixture: ComponentFixture<PageRepertoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRepertoireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
