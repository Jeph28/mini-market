export type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image?: string;
};

export type SortField = 'price' | 'name';
export type SortOrder = 'asc' | 'desc';
