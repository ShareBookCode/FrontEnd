import {
  Button,
  Collapse,
  Drawer,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { useState } from "react";
import styles from "./full.module.scss";
import cn from "classnames";
import { SearchOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store.ts";
import { sharebookApi } from "../../../services/api/sharebookApi.ts";
import { useTranslation } from "react-i18next";
import { CheckboxFilter } from "./CheckboxFilter.tsx";
import { SvgFilter } from "./SvgFilter.tsx";
import { CheckboxGroup } from "./CheckboxGroup.tsx";

const { Title } = Typography;

const languages = [
  {
    id: 1,
    name: "Русский",
  },
  {
    id: 2,
    name: "English",
  },
  {
    id: 3,
    name: "Français",
  },
];

interface Props {
  form: FormInstance;
}

export function FilterFull({ form }: Props) {
  const { i18n } = useTranslation();

  const { data: genre = [] } = useAppSelector(
    sharebookApi.endpoints.findAllGenre.select({
      locale: i18n.language.split("-")[0],
    }),
  );

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const items = [
    {
      key: 1,
      label: (
        <Title level={4} className={cn(styles.sectionTitle, styles.priority)}>
          Автор
        </Title>
      ),
      children: (
        <Form.Item name="author">
          <Input
            placeholder="Поиск"
            suffix={<SearchOutlined />}
            className={styles.searchInput}
          />
        </Form.Item>
      ),
      classNames: { header: styles.collapseHeader },
    },
    {
      key: 2,
      label: (
        <Title level={4} className={cn(styles.sectionTitle, styles.priority)}>
          Жанры
        </Title>
      ),
      children: <CheckboxFilter items={genre} name="genre" />,
      classNames: { header: styles.collapseHeader },
    },
    {
      key: 3,
      label: (
        <Title level={4} className={cn(styles.sectionTitle, styles.priority)}>
          Год издания
        </Title>
      ),
      children: (
        <Form.Item name="year">
          <InputNumber placeholder="Поиск" className={styles.searchInput} />
        </Form.Item>
      ),
      classNames: { header: styles.collapseHeader },
    },
    {
      key: 4,
      label: (
        <Title level={4} className={cn(styles.sectionTitle, styles.priority)}>
          Издательство
        </Title>
      ),
      children: (
        <Form.Item name="publishingHouse">
          <Input
            placeholder="Поиск"
            suffix={<SearchOutlined />}
            className={styles.searchInput}
          />
        </Form.Item>
      ),
      classNames: { header: styles.collapseHeader },
    },
    {
      key: 5,
      label: (
        <Title level={4} className={cn(styles.sectionTitle, styles.priority)}>
          Язык
        </Title>
      ),
      children: <CheckboxGroup items={languages} name="language" />,
      classNames: { header: styles.collapseHeader },
    },
  ];

  return (
    <div>
      <Button
        onClick={showDrawer}
        type="primary"
        className={styles.buttonFullFilterOpener}
      >
        <SvgFilter /> Фильтр
      </Button>
      <Form
        form={form}
        name="filter"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Drawer
          onClose={onClose}
          open={open}
          getContainer={false}
          classNames={{
            wrapper: styles.wrapper,
            header: styles.drawerHeader,
            body: styles.drawerBody,
          }}
          title={
            <Title
              level={3}
              className={cn(styles.filterTitle, styles.priority)}
            >
              Фильтр
            </Title>
          }
          footer={
            <div className={styles.buttonContainer}>
              <Button className={styles.resetButton} htmlType="reset">
                Сбросить
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.applyButton}
              >
                Применить
              </Button>
            </div>
          }
        >
          <Collapse items={items} defaultActiveKey={[]} />
        </Drawer>
      </Form>
    </div>
  );
}
