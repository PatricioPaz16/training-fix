import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMainComponent } from './productos-main.component';

describe('ProductosMainComponent', () => {
  let component: ProductosMainComponent;
  let fixture: ComponentFixture<ProductosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
