import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { ProductsService } from '@/products/products.service';

// 1. Setup the standard 'pg' pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Seeding Process Started ---');

  // 2. Read and parse the JSON file
  const filePath = path.join(__dirname, 'seed.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);


  // 3. Wipe existing data (Cascade handles reviews)
  await prisma.product.deleteMany();
  console.log('Existing data cleared.');

  // 4. Create Products
  console.log(`Seeding ${data.products.length} products...`);
  for (const product of data.products) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        brand: product.brand, // Included from your new JSON
        description: product.description, // Included from your new JSON
        price: product.price,
        imageUrls: product.imageUrls,
        createdAt: new Date(product.createdAt),
      },
    });
  }

  // 5. Create Reviews
  console.log(`Seeding ${data.reviews.length} reviews...`);
  for (const review of data.reviews) {
    await prisma.review.create({
      data: {
        id: review.id,
        productId: review.productId,
        reviewerName: review.reviewerName,
        title: review.title,
        rating: review.rating,
        numUpvotes: review.numUpvotes,
        description: review.description,
        attachmentUrl: review.attachmentUrl,
        createdAt: new Date(review.createdAt),
      },
    });
  }

  // Reset sequences to match highest IDs in database
  await prisma.$executeRaw`
  SELECT setval('"Product_id_seq"', (SELECT MAX(id) FROM "Product"))
  `;
  await prisma.$executeRaw`
  SELECT setval('"Review_id_seq"', (SELECT MAX(id) FROM "Review"))
  `;

  console.log('--- Seeding Process Finished Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Closing connections...');
    await prisma.$disconnect();
    await pool.end(); // This ensures the terminal prompt returns automatically
    console.log('Done.');
  });
