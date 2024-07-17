import Link from 'next/link'
import styles from './linkNextOrPrevious.module.scss'
import { useEffect } from 'react'

interface ILinkNextOrPrevious {
    path: string,
    text: string,
    textLink: string,
    srcImage?: string,
    isNext?: boolean
}
/**
 * Renders the header of the app
 *
 * @param {TImageThemes[]}   props.themes     - Array of themes to display
 */
export function LinkNextOrPrevious({
    path,
    text,
    textLink,
    srcImage,
    isNext
}: ILinkNextOrPrevious) {


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