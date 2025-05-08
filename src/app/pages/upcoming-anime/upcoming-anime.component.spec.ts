import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnimeComponent } from './upcoming-anime.component';

describe('UpcomingAnimeComponent', () => {
  let component: UpcomingAnimeComponent;
  let fixture: ComponentFixture<UpcomingAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
