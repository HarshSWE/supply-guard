import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDetailsComponent } from './supplier-details.component';

describe('SupplierDetails', () => {
  let component: SupplierDetailsComponent;
  let fixture: ComponentFixture<SupplierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
