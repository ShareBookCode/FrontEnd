import { Checkbox, Form } from "antd";
import styles from "./full.module.scss";

interface CheckboxGroupProps {
  items: { id?: number; name?: string }[];
  name?: string;
}

export function CheckboxGroup({ items, name }: CheckboxGroupProps) {
  return (
    <Form.Item name={name} className={styles.checkboxOverflow}>
      <Checkbox.Group className={styles.checkboxGroup}>
        {items.map((item) => (
          <Checkbox key={item.id} value={item.id} className={styles.checkbox}>
            {item?.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
}
