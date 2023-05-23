export interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  createdByCustomerId: number;
  createdByRole: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  cartId: number;
  product: Product; // assuming each item has a 'product' object with product details
}

export interface Cart {
  id: number;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  items: CartItem[];
  totalPrice: number;
}