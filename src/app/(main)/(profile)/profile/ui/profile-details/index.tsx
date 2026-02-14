import { createStyleRegistry } from 'styled-jsx'
import styles from './index.module.scss'
import Goul from "@/shared/icons/goul.svg"

interface Props {
    name: string;
    countBooks: number;
    countExchange: number;
    description: string;
}
export const ProfileDetails = ({ name, countBooks, countExchange, description }: Props) => {
    return (
        <div className={styles.details}>
            <h2 className={styles.details__name}>{name}</h2>
            <div className={styles.details__stats}>
                <Goul width={20} height={20} /> <span>Отдано {countBooks} книг </span> • <span>Обменяно {countExchange}</span>
            </div>
            <p className={styles.details__descr}>
                {description}
            </p>
        </div>
    )
}