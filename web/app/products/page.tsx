import Link from 'next/link';
import { fetchProducts } from '../../lib/api';
import type { Product } from '../../lib/types';
import { ProductCard } from '../../components/ProductCard';
import { Controls } from '../../components/Controls';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number(searchParams.page || '1');
  const limit = Number(searchParams.limit || '6');
  const sort = (searchParams.sort as 'name' | 'price') || 'name';
  const order = (searchParams.order as 'asc' | 'desc') || 'asc';
  const available =
    (searchParams.available as string) === 'true'
      ? true
      : (searchParams.available as string) === 'false'
        ? false
        : undefined;
  const search = (searchParams.search as string) || '';

  const products: Product[] = await fetchProducts({ page, limit, sort, order, available, search });
  const hasPrev = page > 1;
  const hasNext = products.length >= limit;

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Productos</h1>
      <Controls searchParams={searchParams} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 16,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
        <Link
          aria-disabled={!hasPrev}
          href={
            hasPrev
              ? `/products?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v ?? '')])), page: String(page - 1) })}`
              : '#'
          }
          style={{
            pointerEvents: hasPrev ? 'auto' : 'none',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            background: hasPrev ? '#ffffff' : '#f3f4f6',
            color: hasPrev ? '#111827' : '#9ca3af',
            textDecoration: 'none',
          }}
        >
          Prev
        </Link>
        <Link
          aria-disabled={!hasNext}
          href={
            hasNext
              ? `/products?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v ?? '')])), page: String(page + 1) })}`
              : '#'
          }
          style={{
            pointerEvents: hasNext ? 'auto' : 'none',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            background: hasNext ? '#111827' : '#f3f4f6',
            color: hasNext ? '#ffffff' : '#9ca3af',
            textDecoration: 'none',
          }}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
