import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Producto no encontrado</h1>
      <p style={{ marginBottom: 12 }}>El producto que buscas no existe o fue removido.</p>
      <Link href="/products" style={{ color: '#2563eb' }}>
        Volver al listado
      </Link>
    </main>
  );
}
