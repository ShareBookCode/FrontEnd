import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./full.module.scss";
import { CheckboxGroup } from "./CheckboxGroup.tsx";
import { useDeferredValue, useMemo, useState } from "react";

interface Item {
  name?: string;
  id?: number;
}

interface Props {
  items: Item[];
  name: string;
}

export function CheckboxFilter({ items, name }: Props) {
  const [itemQuery, setItemQuery] = useState("");
  const deferredItemQuery = useDeferredValue(itemQuery);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name?.toLowerCase().includes(deferredItemQuery.toLowerCase()),
    );
  }, [items, deferredItemQuery]);

  return (
    <>
      <Input
        placeholder="Поиск"
        prefix={<SearchOutlined />}
        className={styles.searchInput}
        onChange={(e) => setItemQuery(e.target.value)}
        value={itemQuery}
      />
      <CheckboxGroup items={filteredItems} name={name} />
    </>
  );
}
