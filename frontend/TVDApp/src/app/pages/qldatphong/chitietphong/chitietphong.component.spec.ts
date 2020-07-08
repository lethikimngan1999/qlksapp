import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietphongComponent } from './chitietphong.component';

describe('ChitietphongComponent', () => {
  let component: ChitietphongComponent;
  let fixture: ComponentFixture<ChitietphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
