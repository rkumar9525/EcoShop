export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
}