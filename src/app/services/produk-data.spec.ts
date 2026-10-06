import { TestBed } from '@angular/core/testing';
import { ProdukData } from './produk-data';

describe('ProdukData', () => {
  let service: ProdukData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdukData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
