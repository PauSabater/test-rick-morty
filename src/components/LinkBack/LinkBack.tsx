import Link from 'next/link'
import styles from './linkBack.module.scss'

/**
 * Renders the header of the app
 *
 * @param {TImageThemes[]}   props.themes     - Array of themes to display
 */
export function LinkBack({path, text}: {path: string, text: string}) {

    return (
        <Link href={path} className={styles.link}>
            <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 3.5L5.5 33L35 62.5" stroke="var(--c-grey-dark)" stroke-width="6" stroke-linecap="round"/>
            </svg>
            {text}
        </Link>
    )
}