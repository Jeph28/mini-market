import { Router } from 'express';
import { z } from 'zod';
import { connectToDatabase } from '../config/mongoose.js';
import { Product } from '../models/product.model.js';
import type { SortField, SortOrder, Product as ProductType } from './types.js';
import { useMockData } from './utils/index.js';
import mockProducts from './data/products.json' with { type: 'json' };

const router = Router();

const querySchema = z.object({
  search: z.string().trim().optional(),
  sort: z.enum(['price', 'name']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .refine((n) => Number.isInteger(n) && n >= 1, 'page must be an integer >= 1'),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .refine((n) => Number.isInteger(n) && n >= 1 && n <= 100, 'limit must be 1..100'),
  available: z
    .string()
    .transform((v) =>
      v?.toLowerCase() === 'true' ? true : v?.toLowerCase() === 'false' ? false : undefined,
    )
    .optional(),
});

router.get('/products', async (req, res) => {
  try {
    // Lo primero es validar los parámetros de la consulta
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    // Desestructuramos los parámetros de la consulta
    const { search, sort, order, page, limit, available } = parsed.data as unknown as {
      search?: string;
      sort: SortField;
      order: SortOrder;
      page: number;
      limit: number;
      available?: boolean;
    };

    // Si estamos en modo mock, solo devolvemos productos de prueba
    // Esto lo puedes setear en el archivo .env
    if (useMockData()) {
      let items: ProductType[] = (mockProducts as ProductType[]).slice();
      if (typeof available === 'boolean') {
        items = items.filter((p) => p.isAvailable === available);
      }
      if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        items = items.filter((p) => regex.test(p.name) || regex.test(p.category));
      }
      items.sort((a, b) => {
        const dir = order === 'asc' ? 1 : -1;
        if (sort === 'price') return (a.price - b.price) * dir;
        return a.name.localeCompare(b.name) * dir;
      });
      const start = (page - 1) * limit;
      const end = start + limit;
      const pageItems = items.slice(start, end);
      return res.json(pageItems);
    }

    // Conectamos a la base de datos
    await connectToDatabase();

    // Construimos el filtro de la consulta
    const filter: Record<string, unknown> = {};
    if (typeof available === 'boolean') {
      filter.isAvailable = available;
    }
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { category: regex }];
    }

    const sortSpec: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    // Buscamos los productos en la base de datos
    const docs = await Product.find(filter)
      .sort(sortSpec)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-_id id name price isAvailable category image')
      .lean();

    return res.json(docs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const id = String(req.params.id);

    //Mismo procedimiento que en el endpoint de productos
    if (useMockData()) {
      const found = (mockProducts as ProductType[]).find((p) => p.id === id);
      if (!found) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(found);
    }

    await connectToDatabase();
    const doc = await Product.findOne({ id })
      .select('-_id id name price isAvailable category image')
      .lean();
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
