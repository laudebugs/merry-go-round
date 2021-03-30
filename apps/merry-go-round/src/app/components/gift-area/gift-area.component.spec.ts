import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftAreaComponent } from './gift-area.component';

describe('GiftAreaComponent', () => {
  let component: GiftAreaComponent;
  let fixture: ComponentFixture<GiftAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
