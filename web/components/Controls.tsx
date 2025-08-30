export function Controls({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const search = (searchParams.search as string) || '';
  const sort = (searchParams.sort as string) || 'name';
  const order = (searchParams.order as string) || 'asc';
  const available = (searchParams.available as string) || '';
  const page = Number(searchParams.page || '1');
  const limit = Number(searchParams.limit || '12');

  const qs = new URLSearchParams({
    search,
    sort,
    order,
    available,
    page: String(page),
    limit: String(limit),
  });

  return (
    <form
      action="/products"
      method="get"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 120px 140px 80px',
        gap: 8,
        marginBottom: 16,
      }}
    >
      <input
        name="search"
        defaultValue={search}
        placeholder="Buscar..."
        style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6 }}
      />
      <select
        name="sort"
        defaultValue={sort}
        style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6 }}
      >
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
      </select>
      <select
        name="order"
        defaultValue={order}
        style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6 }}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select
        name="available"
        defaultValue={available}
        style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6 }}
      >
        <option value="">Todos</option>
        <option value="true">En stock</option>
        <option value="false">Sin stock</option>
      </select>
      <button type="submit" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 6 }}>
        Aplicar
      </button>
    </form>
  );
}
