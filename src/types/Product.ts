export interface Product {
  id: string;
  name: string;
  description: string;
  isArchived?: boolean;
}

export enum ProductTypeEnum {
  fruit = 'fruit',
  vegetable = 'vegetable',
}
