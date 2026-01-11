'use client';

import { CategoryFilter as CategoryFilterType } from '@/types/product';

interface CategoryFilterProps {
  categories: string[];
  selected: CategoryFilterType;
  onChange: (category: CategoryFilterType) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selected === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
            selected === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
      <button
        onClick={() => onChange('favorites')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selected === 'favorites'
            ? 'bg-red-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ❤️ Favorites
      </button>
    </div>
  );
}