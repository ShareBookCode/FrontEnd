import { Typography } from "antd";
import { ShareDropdown } from "../ShareDropdown";
import styles from "./bookContent.module.scss";
import { BookDescription } from "../BookDescription";
import { BookData } from "../../../../types/book";
import { OwnerCard } from "../OwnerCard";
import { BookGallery } from "../BookGallery";

const { Title, Text } = Typography;

const mockBookData: BookData = {
  images: new Array(9).fill("/mocks/mockBookImage.jpg").map((url, id) => ({
    id,
    smallImageUrl: url,
    mediumImageUrl: url,
    largeImageUrl: url,
  })),
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
          <BookGallery images={images} />
          <BookDescription bookDetails={bookDetails} />
        </div>
        <aside>
          <OwnerCard />
        </aside>
      </div>
    </section>
  );
};
