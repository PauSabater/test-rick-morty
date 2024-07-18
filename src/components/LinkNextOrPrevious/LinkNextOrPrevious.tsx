import Link from 'next/link'
import styles from './linkNextOrPrevious.module.scss'

interface ILinkNextOrPrevious {
    path: string,
    text: string,
    textLink: string,
    srcImage?: string,
    isNext?: boolean
}
/**
 * Componente para enlaces de siguiente o anterior
 *
 * @param {string} props.path     - Ruta a la que se redirige
 * @param {string} props.text     - Texto del enlace
 * @param {string} props.textLink - Texto del enlace secundario
 * @param {string} props.srcImage - Imagen del enlace
 * @param {boolean} props.isNext  - Indica si es un enlace de siguiente
 *
 * @returns {JSX.Element}
 */
export function LinkNextOrPrevious({
    path,
    text,
    textLink,
    srcImage,
    isNext
}: ILinkNextOrPrevious): JSX.Element {

    const TextLink = ()=> {
        return (
            <div className={styles.textLink}>
                <p>{text}</p>
                <p>{textLink}</p>
            </div>
        )
    }

    const ImgLink = ()=> {
        return (
            <>
                <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 3.5L5.5 33L35 62.5" stroke="var(--c-grey-dark)" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <img
                    height='50'
                    width='50'
                    src={srcImage}
                    alt={text}
                    className={styles.image}
                />
            </>
        )
    }

    if (textLink) return (
        <Link href={path} className={`${styles.link} ${isNext ? styles.next : ''}`}>
            <ImgLink/>
            <TextLink/>
        </Link>
    )

    else return <div></div>
}