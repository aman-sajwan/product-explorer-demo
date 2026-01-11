import { Product } from '@/types/product';

const API_BASE = 'https://fakestoreapi.com';

// Add retry logic
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) return res;
      
      // If not ok and it's the last retry, throw
      if (i === retries - 1) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed after retries');
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetchWithRetry(`${API_BASE}/products`);
    return res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetchWithRetry(`${API_BASE}/products/${id}`);
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error('Failed to fetch product');
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetchWithRetry(`${API_BASE}/products/categories`);
    return res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories');
  }
}