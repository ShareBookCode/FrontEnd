export type BookDescriptionProps = {
  annotation: string;
  details: {
    author: string;
    publisher: string;
    year: string;
    binding: string;
    pages: number;
    genre: string;
    language: string;
  };
};

export type BookContentProps = {
  title: string;
  author: string;
  coverImage: string;
  galleryImages: string[];
  bookDescription: BookDescriptionProps;
};
