import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchProductById } from '../../../lib/api';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  let product;
  try {
    product = await fetchProductById(params.id);
  } catch {
    // Si no existe, se lanza un error 404
    notFound();
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <Link
        href="/products"
        style={{
          display: 'inline-block',
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #e5e7eb',
          background: '#111827',
          color: '#fff',
          textDecoration: 'none',
          marginBottom: 12,
        }}
      >
        ← Volver
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{product.name}</h1>
          <div style={{ fontSize: 18, marginBottom: 12 }}>${product.price.toFixed(2)}</div>
          <span
            style={{
              fontSize: 12,
              padding: '2px 8px',
              borderRadius: 999,
              background: product.isAvailable ? '#DCFCE7' : '#E5E7EB',
              color: product.isAvailable ? '#166534' : '#374151',
            }}
          >
            {product.isAvailable ? 'En stock' : 'Sin stock'}
          </span>
          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#fff',
              }}
            >
              Agregar a favoritos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
