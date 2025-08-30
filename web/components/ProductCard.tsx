import Link from 'next/link';
import type { Product } from '../lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{
            width: 200,
            height: 200,
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          {/* Mock image placeholder */}
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{product.name}</div>
            <div style={{ fontSize: 14, color: '#374151' }}>${product.price.toFixed(2)}</div>
          </div>
          <span
            style={{
              fontSize: 12,
              padding: '2px 8px',
              borderRadius: 999,
              background: product.isAvailable ? '#DCFCE7' : '#E5E7EB',
              color: product.isAvailable ? '#166534' : '#374151',
              whiteSpace: 'nowrap',
            }}
          >
            {product.isAvailable ? 'En stock' : 'Sin stock'}
          </span>
        </div>
      </Link>
    </div>
  );
}
