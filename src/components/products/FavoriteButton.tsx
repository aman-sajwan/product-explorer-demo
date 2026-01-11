'use client';

import { useFavorites } from '@/hooks/useFavourites';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productId: number;
}

export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(productId);

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
        favorite
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }`}
    >
      <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
      {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}