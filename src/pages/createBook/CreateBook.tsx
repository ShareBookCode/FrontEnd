import { AutoComplete, Button, Form, Input, Radio, Typography } from "antd";
import {
  BookDto,
  sharebookApi,
  useSaveBookMutation,
} from "../../services/api/sharebookApi.ts";
import { BackIcon } from "../../components/Header/svg/BackIcon.tsx";
import styles from "./createBook.module.scss";
import { CheckboxGroupProps } from "antd/es/checkbox/Group";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store.ts";
import { useDeferredValue, useMemo, useState } from "react";
import { AddFile } from "./uploadFile/addFile.tsx";

export function CreateBook() {
  const [form] = Form.useForm<BookDto>();
  const [save] = useSaveBookMutation();
  const { t } = useTranslation("createBook");
  const { i18n } = useTranslation();
  const [itemQuery, setItemQuery] = useState("");
  const deferredItemQuery = useDeferredValue(itemQuery);
  const navigate = useNavigate();

  const { data: genres = [] } = useAppSelector(
    sharebookApi.endpoints.findAllGenre.select({
      locale: i18n.language.split("-")[0],
    }),
  );

  const filteredItems = useMemo(() => {
    return genres
      .filter((genre) =>
        genre.name?.toLowerCase().includes(deferredItemQuery.toLowerCase()),
      )
      .map((genre) => ({
        value: genre.name,
      }));
  }, [genres, deferredItemQuery]);

  const options: CheckboxGroupProps<string>["options"] = [
    { label: t("condition.good"), value: "good" },
    { label: t("condition.normal"), value: "normal" },
    { label: t("condition.bad"), value: "bad" },
  ];

  async function handleFinish(values: BookDto) {
    const bookDto = { ...values };

    bookDto.genre = genres.find((genre) => genre.name === values.genre)?.id;

    try {
      save({ bookDto }).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className={styles.backContainer}>
        <Button
          shape="circle"
          icon={<BackIcon />}
          className={styles.backButton}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>{t("bookPage.title")}</h1>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ condition: "good" }}
          onFinish={handleFinish}
          className={styles.form}
          requiredMark={false}
        >
          <Form.Item
            label={t("title.label")}
            name="title"
            rules={[{ required: true, message: `${t("title.message")}` }]}
          >
            <Input placeholder={t("title.placeholder")} />
          </Form.Item>

          <Form.Item
            label={t("author.label")}
            name="author"
            rules={[{ required: true, message: `${t("author.message")}` }]}
          >
            <Input placeholder={t("author.placeholder")} />
          </Form.Item>

          <Form.Item label={t("genre.label")} name="genre">
            <AutoComplete
              options={filteredItems}
              onSearch={(text: string) => setItemQuery(text)}
              placeholder={t("genre.placeholder")}
            />
          </Form.Item>

          <Form.Item label={t("language.label")} name="language">
            <Input placeholder={t("genre.placeholder")} />
          </Form.Item>

          <Form.Item label={t("publishingHouse.label")} name="publishingHouse">
            <Input placeholder={t("publishingHouse.placeholder")} />
          </Form.Item>

          <Form.Item label={t("year.label")} name="year">
            <Input type="number" placeholder={t("year.placeholder")} />
          </Form.Item>

          <Form.Item label={t("condition.label")} name="condition">
            <Radio.Group
              block
              options={options}
              optionType="button"
              buttonStyle="solid"
              className={styles.condition}
            />
          </Form.Item>

          <Form.Item label={t("cover.label")} name="cover">
            <div className={styles.coverUploadContainer}>
              <AddFile single />
              <Typography.Text type="secondary" className={styles.uploadInfo}>
                {t("cover.info")}
              </Typography.Text>
            </div>
          </Form.Item>

          <Form.Item
            label={t("additionalPhotos.label")}
            name="additionalPhotos"
          >
            <div className={styles.additionalPhotos}>
              <AddFile />
            </div>
          </Form.Item>

          <Form.Item label={t("description.label")} name="description">
            <Input.TextArea
              className={styles.description}
              rows={3}
              placeholder={t("description.placeholder")}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submit}>
              {t("save")}
            </Button>
          </Form.Item>
        </Form>

        <Typography.Text className={styles.rules}>
          <span>{t("rules.text")}</span>
          <Link to="#">{t("rules.link")}</Link>
        </Typography.Text>
      </div>
    </div>
  );
}
