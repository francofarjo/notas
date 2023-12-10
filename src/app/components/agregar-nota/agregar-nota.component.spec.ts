import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNotaComponent } from './agregar-nota.component';

describe('AgregarNotaComponent', () => {
  let component: AgregarNotaComponent;
  let fixture: ComponentFixture<AgregarNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
