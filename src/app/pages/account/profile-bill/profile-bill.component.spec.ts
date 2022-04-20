import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBillComponent } from './profile-bill.component';

describe('ProfileBillComponent', () => {
  let component: ProfileBillComponent;
  let fixture: ComponentFixture<ProfileBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
