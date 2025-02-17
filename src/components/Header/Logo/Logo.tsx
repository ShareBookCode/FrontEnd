import { Link } from "react-router";
import styles from "../header.module.scss";
import { SvgLogo } from "../svg/SvgLogo.tsx";

export function Logo() {
	return (
		<Link to={"/"} className={styles.logo}>
			<SvgLogo />
		</Link>
	);
}
