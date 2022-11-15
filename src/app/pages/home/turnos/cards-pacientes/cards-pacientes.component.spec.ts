import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPacientesComponent } from './cards-pacientes.component';

describe('CardsPacientesComponent', () => {
  let component: CardsPacientesComponent;
  let fixture: ComponentFixture<CardsPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
