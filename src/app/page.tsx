import { getProducts, getCategories } from '@/lib/api';
import { ProductsClient } from '@/components/products/ProductsClient';

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Explorer
          </h1>
          <p className="text-gray-600 mt-1">
            Discover amazing products from our collection
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsClient initialProducts={products} categories={categories} />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Built with Next.js , TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}