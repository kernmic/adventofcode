import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Handlers } from './handlers';

describe('Handlers', () => {
  let component: Handlers;
  let fixture: ComponentFixture<Handlers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Handlers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Handlers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
