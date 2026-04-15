import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config'

// Debug: Let's see if the URL is actually reaching the script
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not defined in the environment.');
}

// 1. Setup the standard 'pg' pool using your env variable
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the constructor (This is the "non-empty" part!)
const prisma = new PrismaClient({ adapter });

const data = {
  products: [
    {
      id: 1,
      name: 'Sachin & Babi Pearl Floral Tie Sleeve Gown',
      price: 85,
      rating: 4.7,
      createdAt: '2024-03-15T10:00:00.000Z',
      imageUrls: [
        'https://pc-ap.rtrcdn.com/productimages/front/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080',
        'https://pc-ap.rtrcdn.com/productimages/side/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080',
        'https://pc-ap.rtrcdn.com/productimages/back/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080',
      ],
    },
    {
      id: 2,
      name: 'Sachin & Babi Midnight Petal Gown',
      price: 95,
      rating: 0.0,
      createdAt: '2024-04-10T11:30:00.000Z',
      imageUrls: ['https://pc-ap.rtrcdn.com/productimages/front/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080'],
    },
    {
      id: 3,
      name: 'Sachin & Babi Rose Garden Maxi',
      price: 70,
      rating: 4.8,
      createdAt: '2024-01-05T12:00:00.000Z',
      imageUrls: [
        'https://pc-ap.rtrcdn.com/productimages/front/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080',
        'https://pc-ap.rtrcdn.com/productimages/nomodel/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080',
      ],
    },
  ],
  reviews: [
    { id: 1, productId: 1, reviewerName: 'Inge Valentino', rating: 5.0, numUpvotes: 14, title: 'Stunning!', description: 'The floral pattern is even more vibrant in person.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/editorial/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-03-20T14:20:00.000Z' },
    { id: 2, productId: 1, reviewerName: 'Rizal Balenciaga', rating: 4.0, numUpvotes: 3, title: 'Beautiful but long', description: "I'm 5'4 and it was dragging a bit.", attachmentUrl: null, createdAt: '2024-03-22T09:15:00.000Z' },
    { id: 3, productId: 1, reviewerName: 'Vincent Van Gown', rating: 5.0, numUpvotes: 8, title: 'Perfect Fit', description: 'The tie sleeves are such a unique touch.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/side/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-04-01T18:45:00.000Z' },
    { id: 4, productId: 3, reviewerName: 'Thomas Tall-Heels', rating: 5.0, numUpvotes: 21, title: 'Incredible', description: 'Just perfect.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/back/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-01-10T10:00:00.000Z' },
    { id: 5, productId: 3, reviewerName: 'Ataka Armani', rating: 5.0, numUpvotes: 0, title: 'Highly recommend', description: 'Fabric is high quality.', attachmentUrl: null, createdAt: '2024-01-12T10:00:00.000Z' },
    { id: 6, productId: 3, reviewerName: 'Wahyu West-Vivienne', rating: 4.0, numUpvotes: 2, title: 'Great dress', description: 'Fit well.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/nomodel/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-01-15T10:00:00.000Z' },
    { id: 7, productId: 3, reviewerName: 'Bejo Bottega', rating: 5.0, numUpvotes: 11, title: 'Loved it', description: 'Wore it to a gala.', attachmentUrl: null, createdAt: '2024-01-18T10:00:00.000Z' },
    { id: 8, productId: 3, reviewerName: 'Rifky Rocha', rating: 5.0, numUpvotes: 5, title: 'Stunning', description: 'The best rental yet.', attachmentUrl: null, createdAt: '2024-01-20T10:00:00.000Z' },
    { id: 9, productId: 3, reviewerName: 'Perhisi Prada', rating: 4.0, numUpvotes: 1, title: 'Good', description: 'A bit tight in the bust.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/side/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-01-22T10:00:00.000Z' },
    { id: 10, productId: 3, reviewerName: 'Suci Satin-Silk', rating: 5.0, numUpvotes: 9, title: 'Dreamy', description: 'Flowed beautifully.', attachmentUrl: null, createdAt: '2024-01-25T10:00:00.000Z' },
    { id: 11, productId: 3, reviewerName: 'Nabilah Nimble-Needle', rating: 5.0, numUpvotes: 6, title: 'Elegant', description: 'Classic look.', attachmentUrl: 'https://pc-ap.rtrcdn.com/productimages/front/1080x/d2/SA256.jpg?auto=webp&optimize=medium&width=1080', createdAt: '2024-01-28T10:00:00.000Z' },
  ],
};

async function main() {
  console.log('--- Seeding Process Started ---');

  // 1. Wipe existing data
  // Because of 'onDelete: Cascade', deleting products will automatically delete reviews.
  await prisma.product.deleteMany();
  console.log('Existing data cleared.');

  // 2. Create Products
  console.log('Seeding products...');
  for (const product of data.products) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        rating: product.rating,
        imageUrls: product.imageUrls,
        createdAt: new Date(product.createdAt),
      },
    });
  }

  // 3. Create Reviews
  console.log('Seeding reviews...');
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

  console.log('--- Seeding Process Finished Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });