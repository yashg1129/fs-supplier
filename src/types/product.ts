export interface ProductFormData {
  productName: string;
  sku: string;
  categoryId: string;
  brand: string;
  description: string;

  mrp: number;
  sellingPrice: number;
  stockQuantity: number;

  size: string;
  color: string;
  material: string;

  active: boolean;
}