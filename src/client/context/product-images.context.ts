import { createContext } from 'react';

export interface ProductImages {
  changeImage(index: number, img: string): void;
  removeImage(index: number): void;
  images: string[];
}

const sampleProductImages: ProductImages = {
  images: [],
  changeImage: () => null,
  removeImage: () => null,
};
export const ProductImagesContext =
  createContext<ProductImages>(sampleProductImages);
