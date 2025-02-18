import { Typography } from "antd";
import styles from "./bookDescription.module.scss";
import { BookDetails } from "../../../../types/book";

const { Title, Paragraph, Text } = Typography;

type Props = {
  bookDetails: BookDetails;
};
export const BookDescription = ({ bookDetails }: Props) => {
  const bookInfo = [
    { label: "Автор", value: bookDetails.author },
    { label: "Издательство", value: bookDetails.publisher },
    { label: "Год издания", value: bookDetails.year },
    { label: "Переплёт", value: bookDetails.binding },
    { label: "Страниц", value: bookDetails.pages },
    { label: "Жанр", value: bookDetails.genre },
    { label: "Язык книги", value: bookDetails.language },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.annotation}>
        <Title level={3}>Описание</Title>
        <Paragraph
          ellipsis={{
            rows: 4,
            expandable: true,
            symbol: (
              <Text className={styles.expandButton}>Читать полностью</Text>
            ),
          }}
          className={styles.annotationText}
        >
          {bookDetails.annotation}
        </Paragraph>
      </div>

      <ul className={styles.details}>
        {bookInfo.map(({ label, value }) => (
          <li key={label} className={styles.detailItem}>
            <Text className={styles.label}>{label}</Text>
            <Text className={styles.value}>{value}</Text>
          </li>
        ))}
      </ul>
    </main>
  );
};
