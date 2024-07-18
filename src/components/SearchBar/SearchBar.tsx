import styles from './searchBar.module.scss'
import { useEffect, useRef, useState } from "react"

interface ISearchBar {
    callbackOnSubmit: Function,
    placeholder: string,
    searchInputValue: string
}

/**
 * Componente para la barra de búsqueda
 *
 * @param {Function} param.callbackOnSubmit    - Función para manejar el submit
 * @param {string}   param.placeholder         - Placeholder para el input
 * @param {string}   param.searchInputValue    - Valor del input
 *
 * @returns {JSX.Element}
 */
export const SearchBar = ({
        callbackOnSubmit,
        placeholder,
        searchInputValue
    }: ISearchBar)=> {

    const refInput = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>(searchInputValue)

    useEffect(()=> {
        setValue(searchInputValue)
    }, [searchInputValue])

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
                onChange={(e) => setValue(e.target.value)}
                value={value}
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