import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimTrainerComponent } from './aim-trainer.component';

describe('AimTrainerComponent', () => {
  let component: AimTrainerComponent;
  let fixture: ComponentFixture<AimTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AimTrainerComponent]
    });
    fixture = TestBed.createComponent(AimTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
