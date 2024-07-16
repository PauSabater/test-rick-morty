import { getSlugFromName } from "@/utils/utils"
import styles from './inputSearch.module.scss'


interface IInputSearchFilters {
    callbackOnChange: Function,
    placeholder: string
}


export const InputSearch = ({callbackOnChange, placeholder}: IInputSearchFilters)=> {

    return (
        <input
            type="text"
            onChange={(e) => callbackOnChange(e.target.value)}
            className={styles.input}
            placeholder={placeholder}
        >
            {/* <img
                src={'filters.svg'}
                alt={'filters'}
                className={styles.image}
                height={'40'}
                width={'40'}
            /> */}
        </input>
    )
}