export type BookDetails = {
  title: string;
  annotation: string;
  author: string;
  publisher: string;
  year: string;
  binding: string;
  pages: number;
  genre: string;
  language: string;
};

export type BookImage = {
  id: number;
  smallImageUrl: string;
  mediumImageUrl: string;
  largeImageUrl: string;
};

export type BookData = {
  images: BookImage[];
  bookDetails: BookDetails;
};
