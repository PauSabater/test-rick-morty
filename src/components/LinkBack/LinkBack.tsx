import Link from 'next/link'
import styles from './linkBack.module.scss'

/**
 * Renders the header of the app
 *
 * @param {TImageThemes[]}   props.themes     - Array of themes to display
 */
export function LinkBack({path, text}: {path: string, text: string}) {


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
        </Link>
    )
}