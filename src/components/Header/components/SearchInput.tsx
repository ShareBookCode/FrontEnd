import styles from "../header.module.scss";
import { Form, Input } from "antd";
import { SvgSearch } from "../svg/SvgSearch.tsx";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SearchInput() {
  const [focusSearch, setFocusSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <Form
      onFinish={({ title }) => {
        if (title) {
          navigate(`/search/${title}`);
        }
      }}
      className={styles.containerSearch}
    >
      <Form.Item name="title">
        <div className={styles.miniContainerSearch}>
          <Input
            placeholder="Ищите фентези, детективы, романы"
            onFocus={() => setFocusSearch(true)}
            onBlur={() => setFocusSearch(false)}
            className={styles.search}
            suffix={
              <button className={styles.emptyButton} type="submit">
                <SvgSearch focusSearch={focusSearch} />
              </button>
            }
          />
        </div>
      </Form.Item>
    </Form>
  );
}
