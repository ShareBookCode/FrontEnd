import { Dropdown } from "antd";
import styles from "../filter.module.scss";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { SvgArrow } from "../../../../assets/svg/SvgArrow.tsx";

interface Type {
  label: string;
  key: string;
}

export function FilterType() {
  const { t } = useTranslation("home");

  const types: Type[] = [
    { label: t("filters.type.exchange"), key: "0" },
    { label: t("filters.type.giveAway"), key: "1" },
    { label: t("filters.type.allOptions"), key: "2" },
  ];

  const defaultType = types[2];
  const [searchParams, setSearchParams] = useSearchParams();

  const filterType = searchParams.get("filterType") ?? defaultType.key;
  const [showListState, setShowListState] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    searchParams.set("filterType", key);
    setSearchParams(searchParams);
  };

  return (
    <Dropdown
      overlayClassName={styles.typeFilter}
      menu={{
        items: types,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      onOpenChange={(vis) => setShowListState(vis)}
    >
      <button className={styles.buttonTypeFilter}>
        {types.find((item) => item.key === filterType)?.label ??
          defaultType.label}
        <SvgArrow showListState={showListState} />
      </button>
    </Dropdown>
  );
}
