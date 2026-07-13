import categories from "./gallery.json";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryCategory = {
  slug: string;
  name: string;
  images: GalleryImage[];
};

export const galleryCategories: GalleryCategory[] = categories;
