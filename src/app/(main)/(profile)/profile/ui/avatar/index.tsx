import Image from 'next/image'
import styles from './index.module.scss'
interface Props {
    src: string
    alt: string
}
export const Avatar = ({ src, alt }: Props) => {
    return (
        <div className={styles.avatar}>
            {/* Типа фото */}
            {/* <Image src="https://www.kino-teatr.ru/person/515/6157.jpg" width={100} height={100} alt="avatar" /> */}
            <img src={src} alt={alt} />
            {/* Типа фото */}
        </div>
    )
}