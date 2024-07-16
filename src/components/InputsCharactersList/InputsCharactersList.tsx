'use client'

import { getApiUrl, getHomePageApiData, getSlugFromName } from '@/utils/utils'
import { CardCharacter, ICardCharacter } from '../Card/Card'
import styles from './inputsCharactersList.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useApiCall } from '@/hooks/useCallApi'
import { queryBasicCharacterInfo, queryCharacterEpisodes } from '@/utils/queries'
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
 * Renderiza una lista de Cards con la información de los personajes
 *
 * @param {string}         props.srcImage      - src para la imagen
 * @param {string}         props.name          - Nombre para el personaje
 */
export function InputsCharactersList({ inputsData }: IInputsCharacterList) {

    const refContainer = useRef<HTMLUListElement>(null)
    const [isFirstSelect, setIsFirstSelect] = useState<boolean>(true)
    const [previousSelected, setPreviousSelected] = useState<string>('')
    const [lastSelected, setLastSelected] = useState<string>('')
    const [dataCommonEpisodes, setDataCommonEpisodes] = useState<{name: string}[] | null>(null)

    // const { data, callApi } = useApiCall()

    const { data, loading, error, callApi } = useApiCallCompareCharactersEpisodes()


    const updateSelecterCharacters = (value: string) => {
        if (isFirstSelect) {
            setPreviousSelected(value)
            setIsFirstSelect(false)
            return
        }
        else if (previousSelected === value) {
            setPreviousSelected('')
        }

        else if (lastSelected === value) {
            setLastSelected('')
        }

        else if (lastSelected !== '' && previousSelected !== '') {
            setLastSelected(value)
        }

        else setLastSelected(value)

        // setLastSelected(value)

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
        console.log('data change')
        console.log(data)
        if (data) {
            setDataCommonEpisodes(data)
        }
    },[JSON.stringify(data)])



    const Results = () => {

        return (
            <div
                className={styles.results}
                display-results={(lastSelected !== '' && previousSelected !== '' && data !== null).toString()}
            >
                <div className={styles.resultsContent}>
                    <div className={styles.inputsContainer}>
                        {
                            previousSelected ?
                                <InputCharacter
                                    {...inputsData.find(character => character.name === previousSelected) as IInputData}
                                    checked={true}
                                    onChange={updateSelecterCharacters}
                                    isInModal={true}
                                />
                            : lastSelected ? <p className={styles.textEmpty}>SELECT A SECOND CHARACTER</p> : <></>
                        }
                            <p>
                                {
                                    lastSelected && previousSelected ? 'AND' : ''
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
                            : previousSelected ? <p className={styles.textEmpty}>SELECT A SECOND CHARACTER</p> : <></>
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


    const EpisodesInCommon = () => {
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
                <h2 className={styles.title}>Select two characters to find the common episodes</h2>
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