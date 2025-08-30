import type { Product } from '../types.js';

export function getTopCheapestAvailable(products: Product[], top: number = 3): Product[] {
  const available = products.filter((p) => p.isAvailable === true);
  const sorted = available.sort((a, b) => a.price - b.price);
  return sorted.slice(0, top);
}

export function useMockData(): boolean {
  return String(process.env.USE_MOCK_DATA).toLowerCase() === 'true';
}
