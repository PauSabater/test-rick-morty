import styles from './filters.module.scss'
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import { SearchBar } from "../SearchBar/SearchBar"
import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox/InputCheckbox"

export type TStatus = 'Alive' | 'Dead' | 'Unknown'
export type TGender = 'female' | 'male' | 'genderless' | 'unknown'
export type TSpecies = 'Human' | 'Alien' | 'Humanoid' | 'Poopybutthole' | 'Mythological Creature' | 'Animal' | 'Robot' | 'Cronenberg' | 'Disease' | 'unknown'

interface IFilter {
    onSelectionUpdate: Function,
    onSearchInputSubmit: Function,
    onButtonRestartClick: Function,
    searchInputValue: string
}

/**
 * Componente para los filtros de la lista
 *
 * @param {Function} param.onSelectionUpdate    - Función para actualizar los filtros
 * @param {Function} param.onSearchInputSubmit  - Función para actualizar la búsqueda
 * @param {Function} param.onButtonRestartClick - Función para reiniciar los filtros
 * @param {string}   param.searchInputValue     - Valor del input de búsqueda
 *
 * @returns {JSX.Element}
 */
export const Filters = ({
        onSelectionUpdate,
        onSearchInputSubmit,
        onButtonRestartClick,
        searchInputValue
    }: IFilter)=> {

    const status: TStatus[] = ['Alive', 'Dead', 'Unknown']
    const gender: TGender[] = ['female', 'male', 'genderless', 'unknown']
    const species: TSpecies[] = ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'unknown']

    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false)

    return (
        <div className={styles.inputsContainer}>
            <ButtonIcon
                callbackOnClick={()=> setAreFiltersOpen(!areFiltersOpen)}
                icon={'filters.svg'}
                value={'list filters'}
                alt={'filters'}
                background={'transparent'}
            />
            <SearchBar
                placeholder={'Search by name'}
                callbackOnSubmit={(value: string) => onSearchInputSubmit(value)}
                searchInputValue={searchInputValue}
            />

            <div className={styles.filtersContainer} data-is-open={areFiltersOpen}>
                <ButtonIcon
                    callbackOnClick={()=> setAreFiltersOpen(false)}
                    icon={'close.svg'}
                    value={'close'}
                    alt={'close filters'}
                    background={'transparent'}
                />

                <p>Species</p>
                {
                    species.map((specie, i) => {
                        return (
                            <InputCheckbox
                                key={`specie-${i}`}
                                name={'specie'}
                                value={specie}
                                id={`specie-${specie}`}
                                onChangeCallback={onSelectionUpdate}
                            />
                        )
                    }
                )}
                <p>Gender</p>
                {
                    gender.map((gender, i) => {
                        return (
                            <InputCheckbox
                                key={`gender-${i}`}
                                name={'gender'}
                                value={gender}
                                id={`gender-${gender}`}
                                onChangeCallback={onSelectionUpdate}
                            />
                        )
                    }
                )}
                <p>Status</p>
                {
                    status.map((status, i) => {
                        return (
                            <InputCheckbox
                                key={`status-${i}`}
                                name={'status'}
                                value={status}
                                id={`status-${status}`}
                                onChangeCallback={onSelectionUpdate}
                            />
                        )
                    })
                }
                <div className={styles.restartButtonContainer}>
                    <ButtonIcon
                        callbackOnClick={onButtonRestartClick}
                        icon={'restart.svg'}
                        value={'restart filters'}
                        alt={'restart filters'}
                        background={'transparent'}
                        text={'Restart filters'}
                    />
                </div>
            </div>
        </div>
    )
}