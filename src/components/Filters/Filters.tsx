import { getSlugFromName } from "@/utils/utils"
import styles from './filters.module.scss'
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import { InputSearch } from "../InputSearch/InputSearch"




export const Filters = ()=> {

    const onButtonFilterClick = () => {
    }

    const onButtonRestartClick = () => {
    }

    const onSearchInputChange = (value: string) => {
        console.log("CHANGE INPIT")
        console.log(value)

    }

    return (
        <div className={styles.inputsContainer}>
            <ButtonIcon
                callbackOnClick={onButtonFilterClick}
                icon={'filters.svg'}
                value={'list filters'}
                alt={'filters'}
            />
            <InputSearch
                placeholder={'filter by name'}
                callbackOnChange={onSearchInputChange}
            />
            <ButtonIcon
                callbackOnClick={onButtonRestartClick}
                icon={'restart.svg'}
                value={'restart filters'}
                alt={'restart filters'}
                background={'transparent'}
            />
        </div>
    )
}