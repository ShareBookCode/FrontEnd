import { Typography } from "antd";
import { ShareDropdown } from "../ShareDropdown";
import styles from "./bookContent.module.scss";
import { BookDescription } from "../BookDescription";
import { BookData } from "../../../../types/book";
import { OwnerCard } from "../OwnerCard";
import { FavoriteButton } from "../FavoriteButton";
import { BookGallerySwiper } from "../BookGallerySwiper";

const { Title, Text } = Typography;

const mockBookData: BookData = {
  images: new Array(6)
    .fill("")
    .map((_, id) => ({ id, imageUrl: "/mocks/mockBookImage.jpg" })),
  bookDetails: {
    title: "Краткие ответы на большие вопросы",
    annotation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10),
    author: "Стивен Хокинг",
    publisher: "Издательство АСТ",
    year: "2022",
    binding: "Жесткий",
    pages: 213,
    genre: "Научный",
    language: "Русский",
  },
};

export const BookContent = () => {
  const { images, bookDetails } = mockBookData;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Title level={1}>{bookDetails.title}</Title>
          <Text>{bookDetails.author}</Text>
        </div>
        <ShareDropdown />
      </header>

      <div className={styles.contentLayout}>
        <div className={styles.contentContainer}>
          <BookGallerySwiper images={images} />
          <BookDescription bookDetails={bookDetails} />
        </div>
        <aside>
          <OwnerCard />
        </aside>
      </div>
    </section>
  );
};
