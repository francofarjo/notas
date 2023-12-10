import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNotaComponent } from './listar-nota.component';

describe('ListarNotaComponent', () => {
  let component: ListarNotaComponent;
  let fixture: ComponentFixture<ListarNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
