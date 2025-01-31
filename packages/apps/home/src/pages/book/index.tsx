import { Layout } from "antd";
import { BookContent } from "./components/BookContent";
import styles from "./styles.module.scss";
import { HeaderComponent } from "../home/components/Header";
import { BookContentProps } from "../../types/books";

const { Content } = Layout;

const mockBookData: BookContentProps = {
  title: "Краткие ответы на большие вопросы",
  author: "Стивен Хокинг",
  coverImage: "/mocks/mockBookImage.jpg",
  galleryImages: [
    "/mocks/mockBookImage.jpg",
    "/mocks/mockBookImage.jpg",
    "/mocks/mockBookImage.jpg",
    "/mocks/mockBookImage.jpg",
    "/mocks/mockBookImage.jpg",
  ],
  bookDescription: {
    annotation: "Lorem ipsum dolor sit amet...",
    details: {
      author: "Стивен Хокинг",
      publisher: "Издательство АСТ",
      year: "2022",
      binding: "Жесткий",
      pages: 213,
      genre: "Научный",
      language: "Русский",
    },
  },
};

export const BookPage = () => {
  return (
    <Layout hasSider={false}>
      <HeaderComponent />
      <Content className={styles.content}>
        <BookContent {...mockBookData} />
        <div>See Also Section Placeholder</div>
      </Content>
    </Layout>
  );
};
