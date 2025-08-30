import 'dotenv/config';
import { connectToDatabase } from '../../config/mongoose.js';
import { Product } from '../../models/product.model.js';
import products from '../data/products.json' with { type: 'json' };

async function run() {
  try {
    await connectToDatabase();
    const count = await Product.countDocuments({});
    if (count > 0) {
      console.log(`[seed] Skipping: collection already has ${count} documents.`);
      process.exit(0);
    }
    await Product.insertMany(products);
    console.log(`[seed] Inserted ${products.length} products.`);
  } catch (err) {
    console.error('[seed] Error:', err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

run();
