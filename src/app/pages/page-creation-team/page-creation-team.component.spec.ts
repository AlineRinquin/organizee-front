import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationTeamComponent } from './page-creation-team.component';

describe('PageCreationTeamComponent', () => {
  let component: PageCreationTeamComponent;
  let fixture: ComponentFixture<PageCreationTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCreationTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreationTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
