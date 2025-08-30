import type { Product } from '../../shared/types';
import { fakeFetchProducts, fakeFetchProductById } from '../_fake-api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001/v1';
const USE_FAKE = String(process.env.NEXT_PUBLIC_USE_FAKE_API || 'false').toLowerCase() === 'true';

function buildQuery(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    usp.set(key, String(value));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchProducts(
  params: {
    search?: string;
    sort?: 'price' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    available?: boolean;
  } = {},
): Promise<Product[]> {
  if (USE_FAKE) return fakeFetchProducts(params);
  const qs = buildQuery(params);
  try {
    const res = await fetch(`${API_BASE}/v1/products${qs}`, { cache: 'no-store' });
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  if (USE_FAKE) return fakeFetchProductById(id);
  const res = await fetch(`${API_BASE}/v1/products/${id}`, { cache: 'no-store' });
  if (res.status === 404) throw new Error('Not found');
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
