import clsx from 'clsx'
import styles from './index.module.scss'
interface Props {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary';
}
export const Button = ({ children, className, variant = 'primary', ...props }: Props) => {
    return <button {...props} className={clsx(styles.button, className, {
        [styles.button__primary]: variant === 'primary',
        [styles.button__secondary]: variant === 'secondary',
    }
    )} >{children}</button>
}