import styles from "./search.module.scss";
import { BookCardComponent } from "../home/components/BookCard";
import { useSearchByTitleQuery } from "../../services/api/sharebookApi.ts";
import { useParams } from "react-router";
import { FilterFull } from "./FullFilter";
import { Form } from "antd";
import { useEffect } from "react";

export function Search() {
  const { title = "" } = useParams();
  const { data } = useSearchByTitleQuery({ title });

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [title, form]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        <div>
          {title} <span className={styles.small}>234 книги найдено</span>
        </div>
        <FilterFull form={form} />
      </h1>
      <BookCardComponent books={data} />
    </div>
  );
}
