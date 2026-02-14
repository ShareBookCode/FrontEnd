import { Button } from '@/shared/ui/button'
import styles from './index.module.scss'

interface Props {
    isMyProfile: boolean
}
export const ProfileActions = ({ isMyProfile }: Props) => {
    return (
        <div className={styles.actions}>
            {
                isMyProfile ? (
                    <>
                        <Button className={styles.actions__secondary} variant='secondary'>Настройки</Button>
                        <Button className={styles.actions__primary}>Новое объявление</Button>
                    </>
                ) : (
                    <Button className={styles.actions__primary}>Написать</Button>
                )
            }
        </div>
    )
}