import styles from './pageContainer.module.scss'


export const PageContainer = ({ children }: {children: JSX.Element })=> {
    return (
        <div className={styles.wrap}>
            {children}
        </div>
    )
}