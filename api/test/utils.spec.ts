import { describe, it, expect } from 'vitest';
import { getTopCheapestAvailable } from '../src/utils/index.js';

describe('getTopCheapestAvailable', () => {
  it('filtra disponibles, ordena por precio asc y devuelve top N', () => {
    const products = [
      { id: 'a', name: 'A', price: 10, isAvailable: true, category: 'x' },
      { id: 'b', name: 'B', price: 5, isAvailable: true, category: 'x' },
      { id: 'c', name: 'C', price: 2, isAvailable: false, category: 'x' },
      { id: 'd', name: 'D', price: 8, isAvailable: true, category: 'x' },
    ];
    const top = getTopCheapestAvailable(products as any, 2);
    expect(top.map((p) => p.id)).toEqual(['b', 'd']);
  });
});
