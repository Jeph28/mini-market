import type { Product } from '../lib/types';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function imageFor(product: { id: string; category: string }): string {
  const seed = slugify(`${product.id}-${product.category}`);
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/200/200`;
}

const BASE_PRODUCTS: Omit<Product, 'image'>[] = [
  {
    id: 'p1',
    name: 'Guantes GN102',
    price: 59.9,
    isAvailable: true,
    category: 'gloves',
  },
  {
    id: 'p2',
    name: 'Casco CS433',
    price: 79.9,
    isAvailable: false,
    category: 'headgear',
  },
  {
    id: 'p3',
    name: 'Bolsa AC990',
    price: 24.5,
    isAvailable: true,
    category: 'bag',
  },
  {
    id: 'p4',
    name: 'Guantes GN200',
    price: 35.0,
    isAvailable: true,
    category: 'gloves',
  },
  {
    id: 'p5',
    name: 'Casco CS900',
    price: 120.0,
    isAvailable: true,
    category: 'headgear',
  },
  {
    id: 'p6',
    name: 'Casco CS900',
    price: 124.0,
    isAvailable: false,
    category: 'headgear',
  },
  {
    id: 'p7',
    name: 'Casco CS900',
    price: 220.0,
    isAvailable: true,
    category: 'headgear',
  },
  {
    id: 'p8',
    name: 'Casco CS900',
    price: 200.0,
    isAvailable: true,
    category: 'headgear',
  },
  {
    id: 'p9',
    name: 'Casco CS900',
    price: 120.6,
    isAvailable: false,
    category: 'headgear',
  },
  {
    id: 'p10',
    name: 'Martillo CS999',
    price: 120.0,
    isAvailable: true,
    category: 'headgear',
  },
  {
    id: 'p11',
    name: 'Cinta CS900',
    price: 120.0,
    isAvailable: true,
    category: 'headgear',
  },
  {
    id: 'p12',
    name: 'Clavos CS901',
    price: 170.0,
    isAvailable: false,
    category: 'headgear',
  },
];

const MOCK_PRODUCTS: Product[] = BASE_PRODUCTS.map((p) => ({ ...p, image: imageFor(p) }));

export async function fakeFetchProducts(
  params: {
    search?: string;
    sort?: 'price' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    available?: boolean;
  } = {},
): Promise<Product[]> {
  const { search = '', sort = 'name', order = 'asc', page = 1, limit = 12, available } = params;
  let items = MOCK_PRODUCTS.slice();
  if (typeof available === 'boolean') items = items.filter((p) => p.isAvailable === available);
  if (search) {
    const re = new RegExp(search, 'i');
    items = items.filter((p) => re.test(p.name) || re.test(p.category));
  }
  items.sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1;
    if (sort === 'price') return (a.price - b.price) * dir;
    return a.name.localeCompare(b.name) * dir;
  });
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

export async function fakeFetchProductById(id: string): Promise<Product> {
  const found = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!found) throw new Error('Not found');
  return found;
}
