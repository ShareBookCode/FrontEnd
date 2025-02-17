import extraStyles from "./headerAuth.module.scss";
import styles from "./header.module.scss";
import { Logo } from "./Logo/Logo.tsx";
import { SwitchLanguages } from "./SwitchLanguages";

export function HeaderLite() {
	return (
		<header className={styles.header}>
			<div className={extraStyles.container}>
				<Logo />
				<div className={styles.blank}></div>
				<SwitchLanguages />
			</div>
		</header>
	);
}
