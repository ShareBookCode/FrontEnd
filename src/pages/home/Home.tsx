import styles from "./home.module.scss";
import { useBooksQuery } from "../../services/api/sharebookApi.ts";
import { HomeMenu } from "./HomeMenu";
import { BookList } from "../../components/BookList";

export function Home() {
	const { data } = useBooksQuery();

	return (
		<div className={styles.container}>
			<HomeMenu />
			<BookList books={data} />
		</div>
	);
}
