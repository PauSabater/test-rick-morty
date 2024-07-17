import { getSlugFromName } from "@/utils/utils"
import styles from './searchBar.module.scss'
import { useRef } from "react"


interface ISearchBar {
    callbackOnSubmit: Function,
    placeholder: string
}


export const SearchBar = ({callbackOnSubmit, placeholder}: ISearchBar)=> {
    const refInput = useRef<HTMLInputElement>(null)


    return (
        <div className={styles.container}>
            <img
                src={'search.svg'}
                alt={'search'}
                className={styles.image}
                height={'30'}
                width={'30'}
            />
            <input
                type="text"
                className={styles.input}
                placeholder={placeholder}
                ref={refInput}
            >
            </input>
            <button
                className={styles.button}
                onClick={() => callbackOnSubmit(refInput.current?.value)}
            >
                search
            </button>
        </div>
    )
}