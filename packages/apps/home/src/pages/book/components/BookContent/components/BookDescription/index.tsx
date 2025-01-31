import { Typography } from "antd";
import styles from "./styles.module.scss";
import { BookDescriptionProps } from "../../../../../../types/books";

const { Title, Paragraph, Text } = Typography;

export const BookDescription = ({
  annotation,
  details,
}: BookDescriptionProps) => {
  const bookDetails = [
    { label: "Автор", value: details.author },
    { label: "Издательство", value: details.publisher },
    { label: "Год издания", value: details.year },
    { label: "Переплёт", value: details.binding },
    { label: "Страниц", value: details.pages },
    { label: "Жанр", value: details.genre },
    { label: "Язык книги", value: details.language },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.annotation}>
        <Title level={3}>Аннотация</Title>
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
          {annotation}
        </Paragraph>
      </div>

      <div className={styles.details}>
        {bookDetails.map(({ label, value }) => (
          <div key={label} className={styles.detailItem}>
            <Text className={styles.label}>{label}</Text>
            <Text className={styles.value}>{value}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
