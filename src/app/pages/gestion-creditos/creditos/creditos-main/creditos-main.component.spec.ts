import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosMainComponent } from './creditos-main.component';

describe('CreditosMainComponent', () => {
  let component: CreditosMainComponent;
  let fixture: ComponentFixture<CreditosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditosMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
