import { Button, Form, Input } from "antd";
import {
  BookDto,
  useSaveBookMutation,
} from "../../services/api/sharebookApi.ts";
import styles from "./createBook.module.scss";
import { useTranslation } from "react-i18next";

export function CreateBook() {
  const [form] = Form.useForm<BookDto>();
  const [save] = useSaveBookMutation();
  const { t } = useTranslation("createBook");

  async function handleFinish(values: BookDto) {
    try {
      save({ bookDto: values }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{}}
      onFinish={handleFinish}
      className={styles.wrapper}
    >
      <Form.Item
        label={t("title.label")}
        name="title"
        rules={[
          { required: true, message: `${t("title.message")}` },
        ]}
      >
        <Input placeholder= {t("title.placeholder")} />
      </Form.Item>

      <Form.Item
        label={t("author.label")}
        name="author"
        rules={[{ required: true, message: `${t("author.message")}` }]}
      >
        <Input placeholder={t("author.placeholder")} />
      </Form.Item>

      <Form.Item label={t("genre.label")} name="genre">
        <Input placeholder={t("genre.placeholder")} />
      </Form.Item>

      <Form.Item label={t("publishingHouse.label")} name="publishingHouse">
        <Input placeholder={t("publishingHouse.placeholder")} />
      </Form.Item>

      <Form.Item label={t("year.label")} name="year">
        <Input
          type="number"
          placeholder={t("year.placeholder")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("save")}
        </Button>
      </Form.Item>
    </Form>
  );
}
