export interface product {
  id: number;

  name: string;

  description: string;

  price: number;

  stock: boolean;

  imgUrl: string;
}
export type Products = product[]