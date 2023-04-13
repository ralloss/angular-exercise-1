export interface Product {
  _id: string;
  product: string;
  cost: number;
  description: string;
  quantity: number;
}

export interface ProductAPIList {
  status: boolean;
  data: Product[];
}

export interface ProductAPI {
  status: boolean;
  data: Product;
}
