'use client';

import { useState, useMemo } from 'react';
import { Product, CategoryFilter as CategoryFilterType } from '@/types/product';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { useFavorites } from '@/hooks/useFavourites';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterType>('all');
  const { favorites, isLoaded } = useFavorites();

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        categoryFilter === 'all' ||
        (categoryFilter === 'favorites' && favorites.includes(product.id)) ||
        product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchQuery, categoryFilter, favorites]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selected={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {!isLoaded ? (
        <div className="text-center text-gray-500">Loading favorites...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        Showing {filteredProducts.length} of {initialProducts.length} products
      </div>
    </div>
  );
}