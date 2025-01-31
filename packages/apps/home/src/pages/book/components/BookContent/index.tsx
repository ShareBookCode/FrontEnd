import { Typography, Layout, Space } from "antd";
import { FavoriteButton } from "./components/FavoriteButton";
import { ShareButton } from "./components/ShareButton";
import styles from "./styles.module.scss";
import { BookGallery } from "./components/BookGallery";
import { BookDescription } from "./components/BookDescription";
import { BookContentProps } from "../../../../types/books";

const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;

export const BookContent = ({
  title,
  author,
  coverImage,
  galleryImages,
  bookDescription,
}: BookContentProps) => {
  return (
    <section className={styles.container}>
      <Header className={styles.header}>
        <Space className={styles.titleWrapper}>
          <Title level={1}>{title}</Title>
          <Text>{author}</Text>
        </Space>
        <Space className={styles.buttonsWrapper}>
          <FavoriteButton />
          <ShareButton />
        </Space>
      </Header>

      <div className={styles.contentLayout}>
        <Content className={styles.contentContainer}>
          <BookGallery mainImage={coverImage} thumbnails={galleryImages} />
          <BookDescription {...bookDescription} />
        </Content>
        <Sider></Sider>
      </div>
    </section>
  );
};
