import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from '@/components/products/FavoriteButton';
import { ArrowLeft } from 'lucide-react';

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export const dynamicParams = true;

export default async function ProductPage({ params }: ProductPageProps) {
  let product;
  
  try {
    product = await getProduct(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <div className="relative h-96 md:h-full min-h-[400px] bg-gray-100 rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex-1">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 capitalize">
                  {product.category}
                </p>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <p className="text-4xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center text-gray-600">
                    <span className="text-yellow-500 mr-1">★</span>
                    {product.rating.rate} ({product.rating.count} reviews)
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <FavoriteButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}