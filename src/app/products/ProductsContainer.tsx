'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { ProductsClient } from '@/components/products/ProductsClient';

export function ProductsContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [productsData, categoriesData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return <ProductsClient initialProducts={products} categories={categories} />;
}