'use client'

import styles from './commonEpisodes.module.scss'
import { useEffect, useRef, useState } from 'react'
import { InputCharacter } from '../InputCharacter/InputCharacter'
import { useApiCallCompareCharactersEpisodes } from '@/hooks/useCallApiCompareEpisodes'

export interface IInputData {
    id: string | undefined;
    image: string | undefined;
    name: string | undefined;
}

export interface IInputsCharacterList {
    inputsData: IInputData[]
}

/**
 * Renderiza una lista de inputs de personajes para comparar los episodios en común
 *
 * @param {IInputData[]}    props.inputsData - Datos de los personajes
 * @returns {JSX.Element}
 */
export function CommonEpisodes({ inputsData }: IInputsCharacterList): JSX.Element {

    const refContainer = useRef<HTMLUListElement>(null)
    const [isFirstSelect, setIsFirstSelect] = useState<boolean>(true)
    const [previousSelected, setPreviousSelected] = useState<string>('')
    const [lastSelected, setLastSelected] = useState<string>('')
    const [dataCommonEpisodes, setDataCommonEpisodes] = useState<{name: string}[] | null>(null)


    const { data, loading, error, callApi } = useApiCallCompareCharactersEpisodes()


    const updateSelecterCharacters = (value: string) => {
        if (isFirstSelect) {
            setPreviousSelected(value)
            setIsFirstSelect(false)
            return
        }
        // deselecciona el valor previo si se selecciona de nuevo
        else if (previousSelected === value) {
            setPreviousSelected('')
            return
        }
        // deselecciona el valor segundo si se selecciona de nuevo
        else if (lastSelected === value) {
            setLastSelected('')
            return
        }

        else if ((lastSelected !== '' && previousSelected !== '')
            || (previousSelected === '' && lastSelected )) {
            setPreviousSelected(lastSelected)
            setLastSelected(value)
            return
        }

        else if (previousSelected && lastSelected === '') {
            setLastSelected(value)
            return
        }

        else setLastSelected(value)
    }

    useEffect(()=> {
        if (lastSelected !== '' && previousSelected !== '') {
            const lastSelectedId = inputsData.find(character => character.name === lastSelected)?.id
            const previousSelectedId = inputsData.find(character => character.name === previousSelected)?.id

            if (lastSelectedId && previousSelectedId) {
                callApi(lastSelectedId, previousSelectedId)
            }
        }


    }, [lastSelected, previousSelected])

    useEffect(() => {
        if (data) {
            setDataCommonEpisodes(data)
        }
    },[JSON.stringify(data)])


    /**
     * Renderiza los resultados
     * @returns {JSX.Element}
     */
    const Results = (): JSX.Element => {

        return (
            <div
                className={styles.results}
                display-results={(lastSelected !== '' && previousSelected !== '' && data !== null).toString()}
            >
                <div className={styles.resultsContent}>
                    <h2>Results</h2>
                    <div className={styles.inputsContainer}>
                        {
                            !previousSelected && !lastSelected ?
                                <p className={styles.textEmpty}>Select two characters from the list 👉🏼</p>
                                : <></>
                        }
                        {
                            previousSelected ?
                                <InputCharacter
                                    {...inputsData.find(character => character.name === previousSelected) as IInputData}
                                    checked={true}
                                    onChange={updateSelecterCharacters}
                                    isInModal={true}
                                />
                            : lastSelected
                                ? <p className={styles.textEmpty}>Select a second character</p>
                                : <></>
                        }
                            <p className={styles.linking}>
                                {
                                    lastSelected && previousSelected ? '&' : ''
                                }
                            </p>
                        {
                            lastSelected ?
                                <InputCharacter
                                    {...inputsData.find(character => character.name === lastSelected) as IInputData}
                                    checked={true}
                                    onChange={updateSelecterCharacters}
                                    isInModal={true}
                                />
                            : previousSelected
                                ? <p className={styles.textEmpty}>Select a second character</p>
                                : <></>
                            }
                    </div>
                    {
                        lastSelected && previousSelected ?
                            <div className={styles.episodesInCommon}>
                                <h3>Episodes in common</h3>
                                <EpisodesInCommon/>
                            </div>
                            : <></>
                    }
                </div>
            </div>
        )
    }

    /**
     * Renderiza los episodios en común
     * @returns {JSX.Element}
     */
    const EpisodesInCommon = (): JSX.Element => {
        if (lastSelected && previousSelected && !loading) return (
            <>
                {
                    dataCommonEpisodes && dataCommonEpisodes?.length > 0 ?
                    <>
                        <ul className={styles.episodesList}>
                            {
                                data.map((name: string, i: number) => {
                                    return (
                                        <li key={`episode-${i}`}>{name}</li>
                                    )
                                })
                            }
                        </ul>
                    </>
                    : !loading
                        ? <p>{`No matching episodes for the characters ${previousSelected} and ${lastSelected}`}</p>
                        : <></>

                }
            </>

        )
        else if (loading) return <p>Loading...</p>
        else return <></>
    }

    return (
        <div className={styles.containerCompare}>
            <Results/>
            <div className={styles.listContainer}>
                {/* <h2 className={styles.title}>Select two characters to find the common episodes</h2> */}
                <ul ref={refContainer} className={styles.container}>
                    {
                        inputsData.map((character, i) => {
                            return (
                                <li key={`item-${i}`}>
                                    <InputCharacter
                                        {...character}
                                        checked={lastSelected === character.name || previousSelected === character.name}
                                        key={`input-${i}`}
                                        onChange={updateSelecterCharacters}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}