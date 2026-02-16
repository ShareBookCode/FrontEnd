import Image from 'next/image'
import styles from './index.module.scss'
interface Props {
  src: string
  alt: string
}
export const Avatar = ({ src, alt }: Props) => {
  return (
    <div className={styles.avatar}>
      <Image src={src} width={100} height={100} alt={alt} />
    </div>
  )
}
