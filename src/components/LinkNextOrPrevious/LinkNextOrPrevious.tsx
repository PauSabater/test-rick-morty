import Link from 'next/link'
import styles from './linkNextOrPrevious.module.scss'
import { useEffect } from 'react'

/**
 * Renders the header of the app
 *
 * @param {TImageThemes[]}   props.themes     - Array of themes to display
 */
export function LinkNextOrPrevious({path, text}: {path: string, text: string}) {


    /**
     * Set the display style and theme from the local storage
     * when the component is mounted
     */
    // useEffect(()=> {
    //     dispatch(setDisplayStyle(getDisplaStylePersist() as TDisplayStyle))
    //     dispatch(setCurrentTheme(getThemePersist() as TImageThemes))
    //     dispatch(setSeachValue(getSearchValuePersist() as TImageThemes))
    // },[])

    return (
        <Link href={path} >
            {text}
            <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 3.5L5.5 33L35 62.5" stroke="black" stroke-width="7" stroke-linecap="round"/>
            </svg>
        </Link>
    )
}