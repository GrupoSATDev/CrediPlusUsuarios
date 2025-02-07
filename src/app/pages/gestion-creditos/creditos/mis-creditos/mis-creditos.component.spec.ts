import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCreditosComponent } from './mis-creditos.component';

describe('MisCreditosComponent', () => {
  let component: MisCreditosComponent;
  let fixture: ComponentFixture<MisCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCreditosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
