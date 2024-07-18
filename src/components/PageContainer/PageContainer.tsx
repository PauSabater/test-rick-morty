import styles from './pageContainer.module.scss'

/**
 * Componente para contenedor de páginas
 *
 * @param {JSX.Element} props.children - Componentes hijos
 */
export const PageContainer = ({ children }: {children: JSX.Element })=> {
    return (
        <div className={styles.wrap}>
            {children}
        </div>
    )
}