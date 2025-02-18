import styles from "./search.module.scss";
import { BookCardComponent } from "../home/components/BookCard";
import { useSearchByTitleQuery } from "../../services/api/sharebookApi.ts";
import { useParams } from "react-router";
import { FilterFull } from "./FullFilter";
import { Form } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Search() {
  const { title = "" } = useParams();
  const { data } = useSearchByTitleQuery({ title });
  const { t } = useTranslation("search");

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [title, form]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        <div>
          {title} <span className={styles.small}>{t("booksFound.book", {count: 234})}</span>
        </div>
        <FilterFull form={form} />
      </h1>
      <BookCardComponent books={data} />
    </div>
  );
}
